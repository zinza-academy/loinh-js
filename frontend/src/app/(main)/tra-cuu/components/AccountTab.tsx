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
import { User } from "lucide-react";

const AccountTab = () => {
  const [searchId, setSearchId] = useState("030012345678");
  const [fullName, setFullName] = useState("Nguyễn Văn A");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Thông tin cá nhân
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="idNumber">Số CMND/CCCD/Mã định danh công dân</Label>
            <Input
              id="idNumber"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="birthDate">Ngày sinh</Label>
            <Input
              id="birthDate"
              value="16/10/1994"
              readOnly
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="gender">Giới tính</Label>
            <Select defaultValue="male">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="province">Tỉnh/Thành phố</Label>
            <Select defaultValue="hanoi">
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
            <Label htmlFor="district">Quận/Huyện</Label>
            <Select defaultValue="longbien">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="longbien">Long Biên</SelectItem>
                <SelectItem value="dongda">Đống Đa</SelectItem>
                <SelectItem value="hoankiem">Hoàn Kiếm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ward">Phường/Xã</Label>
            <Select defaultValue="giangbien">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="giangbien">Giang Biên</SelectItem>
                <SelectItem value="vietduc">Việt Đức</SelectItem>
                <SelectItem value="thanhxuan">Thanh Xuân</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <Button variant="outline">HỦY BỎ</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">LƯU</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Mật khẩu</h3>

        <div className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <Input
              id="newPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Xác nhận lại mật khẩu</Label>
            <Input id="confirmPassword" type="password" className="mt-1" />
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <Button variant="outline">HỦY BỎ</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">LƯU</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
