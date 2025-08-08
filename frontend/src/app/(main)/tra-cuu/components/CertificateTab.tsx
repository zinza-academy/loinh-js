import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vaccinationData } from "@/lib/constants/vaccinationData";
import { Heart, User, Calendar, IdCard, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

const CertificateTab = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side - Certificate Details */}
      <div className="lg:col-span-2 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </h2>
          <p className="text-sm">Độc lập - Tự do - Hạnh phúc</p>
          <h1 className="text-xl font-bold mt-6">
            CHỨNG NHẬN TIÊM CHỦNG COVID-19
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>
              <strong>Họ và tên:</strong>
            </p>
            <p>{vaccinationData.fullName}</p>
          </div>
          <div>
            <p>
              <strong>Ngày sinh:</strong>
            </p>
            <p>{vaccinationData.birthDate}</p>
          </div>
          <div>
            <p>
              <strong>Số CMND/CCCD:</strong>
            </p>
            <p>{vaccinationData.idNumber}</p>
          </div>
          <div>
            <p>
              <strong>Số thẻ BHYT:</strong>
            </p>
            <p>{vaccinationData.healthInsurance}</p>
          </div>
        </div>

        <div className="text-sm">
          <p>
            <strong>Địa chỉ:</strong>
          </p>
          <p>{vaccinationData.address}</p>
        </div>

        <div className="text-sm">
          <p>
            <strong>Kết luận:</strong>
          </p>
          <p>{vaccinationData.conclusion}</p>
        </div>

        {/* Vaccination Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mũi số</TableHead>
              <TableHead>Thời gian tiêm</TableHead>
              <TableHead>Tên vắc xin</TableHead>
              <TableHead>Số lô</TableHead>
              <TableHead>Nơi tiêm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccinationData.vaccinations.map((vac, index) => (
              <TableRow key={index}>
                <TableCell>{vac.dose}</TableCell>
                <TableCell>{vac.date}</TableCell>
                <TableCell>{vac.vaccine}</TableCell>
                <TableCell>{vac.batch}</TableCell>
                <TableCell>{vac.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="text-center pt-4">
          <Button
            className="bg-[#303F9F] hover:bg-[#303F9F]/80"
            onClick={() => router.push("/dang-ky-tiem")}
          >
            ĐĂNG KÝ MŨI TIÊM TIẾP THEO
          </Button>
        </div>
      </div>

      {/* Right side - QR Code Card */}
      <div className="lg:col-span-1">
        <div
          className={`${
            vaccinationData.vaccinations.length === 1
              ? "bg-yellow-500"
              : "bg-green-500"
          } text-white p-6 rounded-lg`}
        >
          <div className="text-center mb-4">
            <Heart className="w-12 h-12 mx-auto mb-2" fill="currentColor" />
            <h3 className="text-lg font-bold">ĐÃ TIÊM 2 MŨI VẮC XIN</h3>
          </div>

          <div className="bg-white p-4 rounded-lg mb-4">
            <QrCode className="w-full h-32 text-black" />
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <div>
                <p className="font-semibold">Họ và tên</p>
                <p>{vaccinationData.fullName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <div>
                <p className="font-semibold">Ngày sinh</p>
                <p>{vaccinationData.birthDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <IdCard className="w-4 h-4" />
              <div>
                <p className="font-semibold">Số CMND/CCCD</p>
                <p>{vaccinationData.idNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTab;
