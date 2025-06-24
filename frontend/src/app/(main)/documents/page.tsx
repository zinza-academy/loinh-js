"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import VaccinationLocationTable from "@/components/VaccinationLocationTable";

const DocumentPage = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("hanoi");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [tableCount, setTableCount] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button className="py-4 px-2 border-b-2 border-blue-600 text-blue-600 font-medium">
              Điểm tiêm
            </button>
            <button className="py-4 px-2 text-gray-600 hover:text-blue-600">
              Đăng ký
            </button>
            <button className="py-4 px-2 text-gray-600 hover:text-blue-600">
              Tài liệu
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
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
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Địa chỉ</SelectItem>
                  <SelectItem value="hanoi">Hà Nội</SelectItem>
                  <SelectItem value="hcm">TP. HCM</SelectItem>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Danh sách điểm tiêm</h2>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Cập nhật điểm tiêm
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Cập Nhật Điểm Tiêm</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="province">Tỉnh/thành phố</Label>
                      <Select
                        value={selectedProvince}
                        onValueChange={setSelectedProvince}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        placeholder="Smart City"
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="person">
                        Người đứng đầu cơ sở tiêm chủng
                      </Label>
                      <Input
                        id="person"
                        placeholder="Đặng Thái Mai"
                        value={selectedPerson}
                        onChange={(e) => setSelectedPerson(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tables">Số bàn tiêm</Label>
                      <Input
                        id="tables"
                        type="number"
                        value={tableCount}
                        onChange={(e) => setTableCount(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        HỦY BỎ
                      </Button>
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => setIsModalOpen(false)}
                      >
                        XÁC NHẬN
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <VaccinationLocationTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentPage;
