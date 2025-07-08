"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import VaccinationLocationTable from "./VaccinationLocationTable";
import CreateInjectionPointModal from "./CreateInjectionPointModal";
import UpdateInjectionPointModal from "./UpdateInjectionPointModal";
import { useVaccinationSites } from "@/hooks/useGetVaccinationSites";
import { VaccinationSitesResponse } from "@/types";

function InjectionPointTab() {
  const [searchLocation, setSearchLocation] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<VaccinationSitesResponse | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");

  const { data: vaccinationSitesData } = useVaccinationSites();

  // Get unique provinces, districts, and wards
  const provinces = React.useMemo(() => {
    if (!vaccinationSitesData?.data) return [];
    const uniqueProvinces = new Map<number, { id: number; name: string }>();
    vaccinationSitesData.data.data.forEach((site) => {
      uniqueProvinces.set(site.province.id, site.province);
    });
    return Array.from(uniqueProvinces.values());
  }, [vaccinationSitesData]);


  // Handle row click from VaccinationLocationTable
  const handleRowClick = (location: VaccinationSitesResponse) => {
    setSelectedLocation(location);
    setSelectedProvinceId(location.province.id.toString());
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Điểm tiêm"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select
                value={selectedProvinceId}
                onValueChange={(value) => {
                  setSelectedProvinceId(value);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tỉnh/Thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem
                      key={province.id}
                      value={province.id.toString()}
                    >
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Danh sách điểm tiêm</h2>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Thêm Điểm Tiêm
              </Button>
            </div>
            <VaccinationLocationTable onRowClick={handleRowClick} />
          </div>
        </div>
      </main>

      <CreateInjectionPointModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      <UpdateInjectionPointModal
        selectedLocation={selectedLocation}
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
      />
    </div>
  );
}

export default InjectionPointTab;
