"use client";

import React, { useRef, useState } from "react";
import { useGetUserDetail } from "../tra-cuu/hooks/useGetUserDetail";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import { useUploadUserAvatar } from "./hooks/useUploadUserAvatar";

export default function UserPage() {
  const { user } = useAuthStore();
  const userId = user?.id ? String(user.id) : undefined;

  const { data: userData, isLoading } = useGetUserDetail(userId);
  const { uploadAvatar, isPending } = useUploadUserAvatar();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!avatarFile || !userId) return;

    const formData = new FormData();
    formData.append("avatar", avatarFile);
    await uploadAvatar(avatarFile);
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  if (isLoading) {
    return <div className="p-8">Đang tải thông tin người dùng...</div>;
  }

  if (!user) {
    return <div className="p-8">Không lấy được thông tin người dùng.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Thông tin hồ sơ cá nhân
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10 space-y-6 md:space-y-0">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-md hover:scale-105 transition-transform">
              <Image
                src={
                  avatarPreview ||
                  (process.env.NEXT_PUBLIC_API_URL ?? "") +
                    (user?.avatarUrl ? userData?.data.avatarUrl : "") ||
                  ""
                }
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 text-sm text-blue-600 hover:underline font-medium"
            >
              Chọn ảnh mới
            </button>

            {avatarFile && (
              <button
                onClick={handleUpload}
                disabled={isPending}
                className={`mt-2 px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-md transition-all duration-200 ${
                  isPending
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
                }`}
              >
                {isPending ? "Đang tải lên..." : "Tải lên ảnh đại diện"}
              </button>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 w-full space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <label className="text-sm font-medium text-gray-600">
                Họ tên
              </label>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <label className="text-sm font-medium text-gray-600">
                Ngày sinh
              </label>
              <p className="text-base text-gray-800">
                {userData?.data.birthDate
                  ? new Date(userData.data.birthDate).toLocaleDateString()
                  : "Chưa cập nhật"}
              </p>
            </div>

            {/* Bạn có thể thêm thêm nhiều trường tại đây */}
          </div>
        </div>
      </div>
    </div>
  );
}
