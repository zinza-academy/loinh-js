import { z } from "zod";

export const signupSchema = z.object({
  identityNumber: z
    .string()
    .min(1, "Số CCCD/CMND là bắt buộc")
    .regex(/^\d{9}$|^\d{12}$/, "Số CCCD/CMND phải có 9 hoặc 12 số"),
  name: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Vui lòng nhập email hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/^\S*$/, "Mật khẩu không được chứa khoảng trắng"),
  gender: z.string().min(1, "Giới tính là bắt buộc"),
  province: z.string().min(1, "Tỉnh/Thành phố là bắt buộc"),
  district: z.string().min(1, "Quận/Huyện là bắt buộc"),
  wardId: z.number().min(1, "Xã/Phường là bắt buộc"),
});

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Vui lòng nhập email hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/^\S*$/, "Mật khẩu không được chứa khoảng trắng"),
});
