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
import { useStep } from "../contexts/StepContext";
import { StepNumber } from "@/lib/constants/vaccineRegistrationStep";
import { useVaccinationRegistrationStore } from "../store/vacinationRegistrationStore";
import { VaccinationRegistrationParams } from "../types";
import { useVaccinationSites } from "@/hooks/useGetVaccinationSites";
import { useGetLocation } from "@/hooks/useGetLocation";

function PersonalInfoStep() {
  const form = useForm<VaccinationRegistrationParams>({
    defaultValues: {
      priorityGroup: "",
      healthInsuranceNumber: "",
      currentJob: "",
      currentAddressId: null,
      preferredSession: "",
      registrationDate: null,
      vaccinationSiteId: null,
      consent: false,
    },
  });

  const { setCurrentStep } = useStep();
  const { updateData } = useVaccinationRegistrationStore();
  const { data, isLoading } = useVaccinationSites();
  const { data: locationData, isLoading: isLocationLoading } = useGetLocation();
  const onSubmit = (data: VaccinationRegistrationParams) => {
    updateData(data);
    setCurrentStep(StepNumber.ConsentForm);
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
                      value={field.value || ""}
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
                name="healthInsuranceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số thẻ BHYT</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Số thẻ BHYT"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentJob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nghề nghiệp</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
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

              {/* currentAddressId: number | null */}
              <FormField
                control={form.control}
                name="currentAddressId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ hiện tại</FormLabel>
                    <Select
                      onValueChange={(val) =>
                        field.onChange(val ? Number(val) : null)
                      }
                      value={field.value ? String(field.value) : ""}
                      disabled={!locationData || isLocationLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn địa chỉ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationData &&
                          Array.isArray(locationData.data) &&
                          locationData.data.map((loc) => (
                            <SelectItem key={loc.id} value={String(loc.id)}>
                              {loc.name}
                            </SelectItem>
                          ))}
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
              {/* registrationDate: Date | null */}
              <FormField
                control={form.control}
                name="registrationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày muốn được tiêm (dự kiến)</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? new Date(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredSession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buổi tiêm mong muốn</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Buổi tiêm mong muốn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MORNING">Buổi sáng</SelectItem>
                        <SelectItem value="AFTERNOON">Buổi chiều</SelectItem>
                        <SelectItem value="ANYTIME">Bất kỳ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* vaccinationSiteId: number | null */}
              <FormField
                control={form.control}
                name="vaccinationSiteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điểm tiêm</FormLabel>
                    <Select
                      onValueChange={(val) =>
                        field.onChange(val ? Number(val) : null)
                      }
                      value={field.value ? String(field.value) : ""}
                      disabled={!data || isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn điểm tiêm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data &&
                          data.data &&
                          Array.isArray(data.data.data) &&
                          data.data.data.map((site) => (
                            <SelectItem key={site.id} value={String(site.id)}>
                              {site.name}
                            </SelectItem>
                          ))}
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
              onClick={() => setCurrentStep(StepNumber.PersonalInfo)}
              className="flex items-center space-x-2 h-9 rounded-[8px] rounded-br-none bg-white text-[#303F9F] hover:text-[#303F9F] hover:bg-gray-200 border-[#303F9F] "
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6761_463)">
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
              disabled={!form.formState.isValid || !form.formState.isDirty}
            >
              <span className="font-semibold">TIẾP TỤC</span>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6761_473)">
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
