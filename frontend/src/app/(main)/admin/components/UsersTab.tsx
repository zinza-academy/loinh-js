"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { User } from "../types";
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";
import dayjs from "dayjs";
import { UserGender } from "@/lib/types/user";

function UsersTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const limit = 10;

  const {
    data: usersData,
    isLoading,
    error,
  } = useGetAllUsers(currentPage, limit);

  const filteredUsers = usersData?.data?.data?.filter(
    (user: User) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.identityNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.identity?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    // TODO: Implement delete functionality
    console.log("Delete user:", userId);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge variant="destructive">Quản trị viên</Badge>;
      case "USER":
        return <Badge variant="secondary">Người dùng</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getGenderLabel = (gender: UserGender) => {
    return gender === UserGender.MALE ? "Nam" : "Nữ";
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Chưa có thông tin";
    return dayjs(date).format("DD/MM/YYYY");
  };

  const getLocationString = (user: User) => {
    const { location } = user;
    if (!location) return "Chưa có thông tin";
    return `${location.ward?.name || ""}, ${location.district?.name || ""}, ${
      location.province?.name || ""
    }`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">
          Có lỗi xảy ra khi tải dữ liệu
        </div>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Quản lý người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, CMND/CCCD, hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tạo người dùng mới
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>CMND/CCCD</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Giới tính</TableHead>
                  <TableHead>Ngày sinh</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers?.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.identityNumber}</TableCell>
                      <TableCell>
                        {user.identity?.email || "Chưa có email"}
                      </TableCell>
                      <TableCell>{getGenderLabel(user.gender)}</TableCell>
                      <TableCell>{formatDate(user.birthDate)}</TableCell>
                      <TableCell>
                        {getRoleBadge(user.identity?.role || "USER")}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {getLocationString(user)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {usersData?.data?.meta && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Hiển thị {(currentPage - 1) * limit + 1} -{" "}
                {Math.min(currentPage * limit, usersData.data.meta.total)}
                trong tổng số {usersData.data.meta.total} người dùng
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <span className="text-sm">
                  Trang {currentPage} /{" "}
                  {Math.ceil(usersData.data.meta.total / limit)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    currentPage >= Math.ceil(usersData.data.meta.total / limit)
                  }
                >
                  Sau
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateUserModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
      <UpdateUserModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        user={selectedUser}
      />
    </div>
  );
}

export default UsersTab;
