import { Command, Console } from 'nestjs-console';
import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';
import * as path from 'path';

@Console()
@Injectable()
export class ImportLocationDataCommand {
    constructor(private readonly prisma: PrismaService) {}

    @Command({
        command: 'import-location-data',
        description: 'Import location data from Excel file',
    })
    async importLocationData(): Promise<void> {
        const filePath = path.join(__dirname, 'location-data.xlsx');
        const workbook = new ExcelJS.Workbook();
        try {
            await workbook.xlsx.readFile(filePath);
        } catch (error) {
            console.error('Không thể đọc file Excel:', error);
            return;
        }
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
            console.error('Không tìm thấy worksheet trong file Excel!');
            return;
        }

        // Map lưu tạm theo mã để mapping cha-con
        const provinceMap = new Map<string, any>(); // mã tỉnh -> { id, name }
        const districtMap = new Map<string, any>(); // mã huyện -> { id, name, provinceId }

        let processedRows = 0;
        let skippedRows = 0;
        for (let i = 2; i <= worksheet.rowCount; i++) { // Bỏ qua header
            const row = worksheet.getRow(i);
            const code = row.getCell(1).value?.toString()?.trim(); // Mã
            const name = row.getCell(2).value?.toString()?.trim(); // Tên
            const level = row.getCell(4).value?.toString()?.trim(); // Cấp
            const districtCode = row.getCell(5).value?.toString()?.trim(); // Mã QH
            const districtName = row.getCell(6).value?.toString()?.trim(); // Quận/Huyện
            const provinceCode = row.getCell(7).value?.toString()?.trim(); // Mã TP
            const provinceName = row.getCell(8).value?.toString()?.trim(); // Tỉnh/Thành Phố

            try {
                // Tỉnh/Thành phố
                if (level === 'Tỉnh' || level === 'Thành phố Trung ương') {
                    if (!code || !name) { skippedRows++; continue; }
                    let province = await this.prisma.province.findUnique({ where: { name } });
                    if (!province) {
                        province = await this.prisma.province.create({ data: { name } });
                    }
                    provinceMap.set(code, { id: province.id, name });
                }
                // Quận/Huyện
                else if (['Quận', 'Huyện', 'Thị xã', 'Thành phố thuộc tỉnh'].includes(level ?? '')) {
                    if (!code || !name || !provinceCode) { skippedRows++; continue; }
                    const province = provinceMap.get(provinceCode as string);
                    if (!province) { skippedRows++; continue; }
                    let district = await this.prisma.district.findFirst({
                        where: { name, provinceId: province.id },
                    });
                    if (!district) {
                        district = await this.prisma.district.create({
                            data: { name, provinceId: province.id },
                        });
                    }
                    districtMap.set(code, { id: district.id, name, provinceId: province.id });
                }
                // Phường/Xã/Thị trấn
                else if (['Phường', 'Xã', 'Thị trấn'].includes(level ?? '')) {
                    if (!name || !districtCode) { skippedRows++; continue; }
                    const district = districtMap.get(districtCode as string);
                    if (!district) { skippedRows++; continue; }
                    let ward = await this.prisma.ward.findFirst({
                        where: { name, districtId: district.id },
                    });
                    if (!ward) {
                        ward = await this.prisma.ward.create({
                            data: { name, districtId: district.id },
                        });
                    }
                }
                processedRows++;
                if (processedRows % 100 === 0) {
                    console.log(`Đã xử lý ${processedRows} dòng...`);
                }
            } catch (err) {
                skippedRows++;
                console.error(`Lỗi dòng ${i}:`, err);
            }
        }
        console.log('=== Kết quả import ===');
        console.log(`Tổng số dòng xử lý: ${processedRows}`);
        console.log(`Dòng bị bỏ qua: ${skippedRows}`);
        console.log('Import dữ liệu thành công!');
    }
}
