import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

function Footer() {
  return (
    <footer className="covid-gradient text-white mt-12 bg-[#2D2188]">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0">
          <div className=" space-x-4">
            <div>
              <p className="text-sm">
                © Bản quyền thuộc{" "}
                <strong>
                  TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
                </strong>
              </p>
              <p className="text-sm">
                Phát triển bởi <span className="text-yellow-300">Viettel</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Image
                src="/image/logo2bo 1.png"
                width={195}
                height={89}
                alt="logo2bo"
              />
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
            <p className="text-sm mb-2">
              Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận
              tiêm
            </p>
            <div className="flex space-x-2 self-end">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-gray-100 text-xs px-3 py-1"
              >
                App tiêm di động (Cho HCM)
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-gray-100 text-xs px-3 py-1"
              >
                App Store
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-gray-100 text-xs px-3 py-1"
              >
                Google play
              </Button>
            </div>
            <Image
              className="mt-4 self-end"
              src="/image/handle_cert 1.png"
              width={220}
              height={110}
              alt="handle_cert"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
