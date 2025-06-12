"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-blue-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <Image src="/image/Logo.png" alt="Logo" width={30} height={30} />
          <span className="uppercase font-semibold text-sm md:text-base">
            Cổng thông tin tiêm chủng COVID-19
          </span>
        </div>

        {/* Navigation + Login */}
        <div className="flex gap-4 items-center">
          <nav className="hidden md:flex space-x-6 items-center text-md font-[500]">
            <Link href="/" className="hover:underline">
              Trang chủ
            </Link>
            <Link href="/dang-ky-tiem" className="hover:underline">
              Đăng ký tiêm
            </Link>

            {/* Dropdown Tra cứu */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-1 cursor-pointer hover:underline">
                  Tra cứu <ChevronDown className="w-3 h-3" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="p-3 space-y-3 w-80">
                <Link
                  href="/tra-cuu/chung-nhan"
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="6" fill="#EDE7F6" />
                    <path
                      fillRule="evenodd"
                      clip-rule="evenodd"
                      d="M22.67 19.1299C24.04 20.0599 25 21.3199 25 22.9999V25.9999H29V22.9999C29 20.8199 25.43 19.5299 22.67 19.1299Z"
                      fill="#5E35B1"
                    />
                    <path
                      d="M15 18C17.2091 18 19 16.2091 19 14C19 11.7909 17.2091 10 15 10C12.7909 10 11 11.7909 11 14C11 16.2091 12.7909 18 15 18Z"
                      fill="#5E35B1"
                    />
                    <path
                      fillRule="evenodd"
                      clip-rule="evenodd"
                      d="M21 18C23.21 18 25 16.21 25 14C25 11.79 23.21 10 21 10C20.53 10 20.09 10.1 19.67 10.24C20.5 11.27 21 12.58 21 14C21 15.42 20.5 16.73 19.67 17.76C20.09 17.9 20.53 18 21 18Z"
                      fill="#5E35B1"
                    />
                    <path
                      fillRule="evenodd"
                      clip-rule="evenodd"
                      d="M15 19C12.33 19 7 20.34 7 23V26H23V23C23 20.34 17.67 19 15 19Z"
                      fill="#5E35B1"
                    />
                  </svg>
                  <div>
                    <h5 className="whitespace-nowrap">
                      Tra cứu chứng nhận tiêm
                    </h5>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L13.59 6.41L18.17 11H2V13H18.17L13.58 17.59L15 19L22 12L15 5Z"
                      fill="#5E35B1"
                    />
                  </svg>
                </Link>
                <Link
                  href="/tra-cuu/ket-qua"
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="6" fill="#f8f8f8" />
                    <path
                      fillRule="evenodd"
                      clip-rule="evenodd"
                      d="M22.67 19.1299C24.04 20.0599 25 21.3199 25 22.9999V25.9999H29V22.9999C29 20.8199 25.43 19.5299 22.67 19.1299Z"
                      fill="#1E88E5"
                    />
                    <path
                      d="M15 18C17.2091 18 19 16.2091 19 14C19 11.7909 17.2091 10 15 10C12.7909 10 11 11.7909 11 14C11 16.2091 12.7909 18 15 18Z"
                      fill="#1E88E5"
                    />
                    <path
                      fillRule="evenodd"
                      clip-rule="evenodd"
                      d="M21 18C23.21 18 25 16.21 25 14C25 11.79 23.21 10 21 10C20.53 10 20.09 10.1 19.67 10.24C20.5 11.27 21 12.58 21 14C21 15.42 20.5 16.73 19.67 17.76C20.09 17.9 20.53 18 21 18Z"
                      fill="#1E88E5"
                    />
                    <path
                      fillRule="evenodd"
                      clip-rule="evenodd"
                      d="M15 19C12.33 19 7 20.34 7 23V26H23V23C23 20.34 17.67 19 15 19Z"
                      fill="#1E88E5"
                    />
                  </svg>
                  <div>
                    <h5 className="whitespace-nowrap">
                      Tra cứu kết quả đăng ký
                    </h5>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L13.59 6.41L18.17 11H2V13H18.17L13.58 17.59L15 19L22 12L15 5Z"
                      fill="#1E88E5"
                    />
                  </svg>
                </Link>
              </HoverCardContent>
            </HoverCard>

            <Link href="/tai-lieu" className="hover:underline">
              Tài liệu
            </Link>
          </nav>

          {/* Login Button */}
          <Link href="/account/signin">
            <Button className="bg-white hover:bg-gray-200 text-black font-bold rounded rounded-bl-none">
              Đăng Nhập
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
