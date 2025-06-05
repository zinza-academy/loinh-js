"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function FinishStep({ registrationId }: { registrationId: string }) {
  const router = useRouter();
  return (
    <div className="text-center space-y-6">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      <h2 className="text-2xl font-bold text-green-700">
        Đăng ký tiêm chủng COVID-19 thành công
      </h2>
      <div className="text-lg">
        Mã đặt tiêm của bạn là{" "}
        <span className="font-bold text-red-600">{registrationId}</span>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg text-left">
        <p className="text-sm mb-4">
          Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin phòng COVID-19. Hiện
          tại Bộ Y tế đang tiến hành thu thập nhu cầu và thông tin để lập danh
          sách đối tượng đăng ký tiêm vắc xin COVID-19 theo từng đợt.
        </p>
        <p className="text-sm mb-4">
          Chúng tôi sẽ liên hệ với quý khách theo số điện thoại{" "}
          <span className="font-semibold">0123456789</span> khi có kế hoạch tiêm
          trong thời gian sớm nhất.
        </p>
        <p className="text-sm">
          Mọi bạn hãi ứng dụng <strong>{"SỞ SỨC KHỎE ĐIỆN TỬ"}</strong> tại{" "}
          <a
            href="https://hssk.kcb.vn/#/ssosk"
            className="text-blue-600 underline"
          >
            https://hssk.kcb.vn/#/ssosk
          </a>{" "}
          để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng
          COVID-19
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 text-left">
        <div>
          <h3 className="font-semibold mb-2">Họ và tên</h3>
          <p>Nguyễn A</p>

          <h3 className="font-semibold mb-2 mt-4">
            Số CMND/CCCD/Mã định danh công dân
          </h3>
          <p>030012345678</p>

          <h3 className="font-semibold mb-2 mt-4">Tỉnh/Thành phố</h3>
          <p>Thành phố Hà Nội</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Ngày sinh</h3>
          <p>16/10/1994</p>

          <h3 className="font-semibold mb-2 mt-4">Số thẻ BHYT</h3>
          <p></p>

          <h3 className="font-semibold mb-2 mt-4">Quận/Huyện</h3>
          <p>Quận Long Biên</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Giới tính</h3>
          <p>Nam</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Xã/Phường</h3>
          <p>Phường Giang Biên</p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 h-9 rounded-[8px] rounded-br-none bg-white text-[#303F9F] hover:text-[#303F9F] hover:bg-gray-200 border-[#303F9F] "
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6761_463)">
              <path
                d="M20.5 11H8.33L13.92 5.41L12.5 4L4.5 12L12.5 20L13.91 18.59L8.33 13H20.5V11Z"
                fill="#303F9F"
              />
            </g>
            <defs>
              <clipPath id="clip0_6761_463">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className=" font-semibold">TRANG CHỦ</span>
        </Button>
        <Button
          type="submit"
          className="bg-[#303F9F] hover:bg-[#303F9F]/90 px-8 h-9 rounded-[8px] rounded-bl-none"
          onClick={() => router.push("/")}
        >
          <span className="font-semibold">XUẤT THÔNG TIN</span>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6761_473)">
              <path
                d="M12.5 4L11.09 5.41L16.67 11H4.5V13H16.67L11.09 18.59L12.5 20L20.5 12L12.5 4Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_6761_473">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default FinishStep;
