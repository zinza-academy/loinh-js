"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form, // ← import the Form provider
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { StepNumber } from "@/lib/constants/vaccineRegistrationStep";
import { useForm } from "react-hook-form";

interface VaccinationConsentFormStepProps {
  onChangeStep: (step: StepNumber) => void;
}

function VaccinationConsentFormStep({
  onChangeStep,
}: VaccinationConsentFormStepProps) {
  interface RegistrationFormData {
    consent: boolean;
  }
  const form = useForm<RegistrationFormData>({
    defaultValues: {
      consent: false,
    },
  });

  // optional: handle submit
  const onSubmit = (data: RegistrationFormData) => {
    console.log("Consent data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-lg font-semibold mb-4">
          Phiếu đồng ý tiêm chủng vắc xin phòng COVID-19
        </h2>

        <div className=" p-4">
          <ul>
            <li>
              1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy
              nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn
              toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng
              được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi
              tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng
              chống dịch theo quy định.
            </li>
            <li>
              2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu
              hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu,
              buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc
              xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin
              AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau
              tiêm chủng.
            </li>
            <li>
              3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm
              chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám
              và điều trị kịp thời.
            </li>
          </ul>
        </div>

        <div className="flex gap-5">
          <div className="text-sm">
            Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu và các nguy cơ
            và:
          </div>

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    Đồng ý tiêm chủng
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center gap-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onChangeStep(1)}
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
            <span className=" font-semibold">QUAY LẠI</span>
          </Button>
          <Button
            type="submit"
            className="bg-[#303F9F] hover:bg-[#303F9F]/90 px-8 h-9 rounded-[8px] rounded-bl-none"
            onClick={() => onChangeStep(3)}
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
  );
}

export default VaccinationConsentFormStep;
