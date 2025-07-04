"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useVaccinationSites } from "@/hooks/useGetVaccinationSites";
import { VaccinationSitesResponse } from "@/types";

interface VaccinationLocationTableProps {
  onRowClick: (location: VaccinationSitesResponse) => void;
}

const VaccinationLocationTable = ({
  onRowClick,
}: VaccinationLocationTableProps) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const { data, isLoading, error } = useVaccinationSites();
  const provinces = useMemo(() => {
    const uniqueProvinces = new Map<number, { id: number; name: string }>();
    if (data && data.data && Array.isArray(data.data.data)) {
      data.data.data.forEach((site) => {
        uniqueProvinces.set(site.province.id, site.province);
      });
    }
    return Array.from(uniqueProvinces.values());
  }, [data]);

  const districts = useMemo(() => {
    if (!data?.data || !selectedProvince) return [];
    const uniqueDistricts = new Map<number, { id: number; name: string }>();
    data.data.data
      .filter((site) => site.province.id.toString() === selectedProvince)
      .forEach((site: VaccinationSitesResponse) => {
        uniqueDistricts.set(site.district.id, site.district);
      });
    return Array.from(uniqueDistricts.values());
  }, [data, selectedProvince]);

  const wards = useMemo(() => {
    if (!data?.data || !selectedDistrict) return [];
    const uniqueWards = new Map<number, { id: number; name: string }>();
    data.data.data
      .filter((site) => site.district.id.toString() === selectedDistrict)
      .forEach((site) => {
        uniqueWards.set(site.ward.id, site.ward);
      });
    return Array.from(uniqueWards.values());
  }, [data, selectedDistrict]);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    if (!data?.data?.data) return [];
    return data.data.data.filter((site) => {
      const matchProvince = selectedProvince
        ? site.province.id.toString() === selectedProvince
        : true;
      const matchDistrict = selectedDistrict
        ? site.district.id.toString() === selectedDistrict
        : true;
      const matchWard = selectedWard
        ? site.ward.id.toString() === selectedWard
        : true;
      return matchProvince && matchDistrict && matchWard;
    });
  }, [data, selectedProvince, selectedDistrict, selectedWard]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Tra cứu điểm tiêm theo địa bàn
        </CardTitle>

        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1">
            <Select
              value={selectedProvince}
              onValueChange={setSelectedProvince}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tỉnh/Thành phố" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select
              value={selectedDistrict}
              onValueChange={setSelectedDistrict}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Quận/Huyện" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id.toString()}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Xã/Phường" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((ward) => (
                  <SelectItem key={ward.id} value={ward.id.toString()}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-semibold text-gray-900">
                    STT
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Tên điểm tiêm
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Số nhà, tên đường
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Xã/Phường
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Quận/Huyện
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Tỉnh/Thành phố
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Người đứng đầu cơ sở tiêm chủng
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">
                    Số bàn tiêm
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
                {filteredData.map((row, index) => (
                  <TableRow key={row.id} className="hover:bg-gray-50" onClick={() => onRowClick(row)}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.addressDetail}</TableCell>
                    <TableCell>{row.ward.name}</TableCell>
                    <TableCell>{row.district.name}</TableCell>
                    <TableCell>{row.province.name}</TableCell>
                    <TableCell>{row.headOfVaccination}</TableCell>
                    <TableCell className="text-center">
                      {row.numberOfInjectionTable ?? "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VaccinationLocationTable;
