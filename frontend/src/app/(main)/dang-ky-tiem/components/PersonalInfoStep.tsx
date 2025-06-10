"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface RegistrationFormData {
  priorityGroup: string;
  identityNumber: string;
  profession: string;
  workplace: string;
  currentLocation: string;
  desiredVaccineDate: string;
  desiredVaccineSession: string;
}

function PersonalInfoStep({
  onChangeStep,
}: {
  onChangeStep: (step: number) => void;
}) {
  const form = useForm<RegistrationFormData>({
    defaultValues: {
      priorityGroup: "",
      identityNumber: "",
      profession: "",
      workplace: "",
      currentLocation: "",
      desiredVaccineDate: "",
      desiredVaccineSession: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Registration data:", data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Personal Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              1. Thông tin người đăng ký tiêm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priorityGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nhóm ưu tiên <span className="text-red-500">(*)</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Nhóm ưu tiên" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="group1">
                          Nhóm 1: Người trên 65 tuổi
                        </SelectItem>
                        <SelectItem value="group2">
                          Nhóm 2: Người có bệnh lý nền
                        </SelectItem>
                        <SelectItem value="group3">
                          Nhóm 3: Nhân viên y tế
                        </SelectItem>
                        <SelectItem value="group4">Nhóm 4: Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identityNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số thẻ BHYT</FormLabel>
                    <FormControl>
                      <Input placeholder="Số thẻ BHYT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nghề nghiệp</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Nghề nghiệp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healthcare">
                          Nhân viên y tế
                        </SelectItem>
                        <SelectItem value="teacher">Giáo viên</SelectItem>
                        <SelectItem value="officer">Công chức</SelectItem>
                        <SelectItem value="student">
                          Học sinh/Sinh viên
                        </SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workplace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đơn vị công tác</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Đơn vị công tác" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hospital">Bệnh viện</SelectItem>
                        <SelectItem value="school">Trường học</SelectItem>
                        <SelectItem value="company">Công ty</SelectItem>
                        <SelectItem value="government">
                          Cơ quan nhà nước
                        </SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ hiện tại</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Địa chỉ hiện tại" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hanoi">Hà Nội</SelectItem>
                        <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                        <SelectItem value="danang">Đà Nẵng</SelectItem>
                        <SelectItem value="other">
                          Tỉnh/Thành phố khác
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 2: Vaccination Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              2. Thông tin đăng ký tiêm chủng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="desiredVaccineDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày muốn được tiêm (dự kiến)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ngày/Tháng/Năm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="this-week">Tuần này</SelectItem>
                        <SelectItem value="next-week">Tuần tới</SelectItem>
                        <SelectItem value="this-month">Tháng này</SelectItem>
                        <SelectItem value="next-month">Tháng tới</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desiredVaccineSession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buổi tiêm mong muốn</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Buổi tiêm mong muốn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Buổi sáng</SelectItem>
                        <SelectItem value="afternoon">Buổi chiều</SelectItem>
                        <SelectItem value="evening">Buổi tối</SelectItem>
                        <SelectItem value="anytime">Bất kỳ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <h3 className="font-semibold text-red-700 mb-2">Lưu ý:</h3>
            <ul className="text-sm text-red-600 space-y-1">
              <li>
                • Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến
                dịch tiêm chủng Vắc xin COVID - 19
              </li>
              <li>
                • Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên,
                Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh
                công dân/HC ...)
              </li>
              <li>
                • Bằng việc nhấn nút {"Xác nhận"}, bạn hoàn toàn hiểu và đồng ý
                chịu trách nhiệm với các thông tin đã cung cấp.
              </li>
              <li>
                • Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa
                vào danh sách đặt tiêm. Có số ý tế sẽ thông báo lịch tiêm khi có
                vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-6 gap-4">
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
              <span className=" font-semibold">HỦY BỎ</span>
            </Button>
            <Button
              type="submit"
              className="bg-[#303F9F] hover:bg-[#303F9F]/90 px-8 h-9 rounded-[8px] rounded-bl-none"
              onClick={() => onChangeStep(2)}
            >
              <span className="font-semibold">TIẾP TỤC</span>
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
        </form>
      </Form>
    </div>
  );
}

export default PersonalInfoStep;
