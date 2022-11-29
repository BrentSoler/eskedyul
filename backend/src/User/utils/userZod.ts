import { z } from "zod";

export const SRegister = z.object({
  role: z.enum(["Brgy. Admin", "Admin", "Master Admin", "Resident"]),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be at least 8 characters with uppercase and lowercase with number and special characters",
      }
    )
    .optional(),
  email: z.string().email().optional(),
  fname: z
    .string()
    .min(3, { message: "Name needs to be atleast 3 letters" })
    .regex(/^[A-Za-z]+$/, { message: "Name should only consist of letters" }),
  mname: z
    .string()
    .min(3, { message: "Name needs to be atleast 3 letters" })
    .regex(/^[A-Za-z]+$/, { message: "Name should only consist of letters" })
    .optional(),
  lname: z
    .string()
    .min(3, { message: "Name needs to be atleast 3 letters" })
    .regex(/^[A-Za-z]+$/, { message: "Name should only consist of letters" }),
  suffix: z.string(),
  sex: z.enum(["Male", "Female"]),
  mobileNo: z.string().regex(/^0(9)\d{9}$/, { message: "Invalid Phone No." }),
  presAdd: z.string(),
  permAdd: z.string(),
  brgyId: z.string(),
  idType: z.string(),
  idNo: z.string(),
});

export const SRegisterResident = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  seniorType: z.enum(["OLD", "NEW"]),
  emgContNum: z
    .string()
    .regex(/^0(9)\d{9}$/, { message: "Invalid Phone No." })
    .optional(),
  emgContName: z
    .string()
    .min(3, { message: "Name needs to be atleast 3 letters" })
    .regex(/^[A-Za-z]+$/, { message: "Name should only consist of letters" })
    .optional(),
  civilStatus: z.enum(["Single", "Married", "Divorced"]),
  birthdate: z.string(),
  birthPlace: z.string(),
  OSCAId: z
    .string()
    .regex(/^[0-9]$/, { message: "OSCAID needs to be numbers only" })
    .optional(),
  empStatus: z.enum(["Employed", "Retired w/pension", "Retired wo/ pention"]),
  residencyStatus: z.enum(["6months of Residency", "Registered Voter"]),
});

export const SLoginAdmin = z.object({
  mobileNo: z.string().regex(/^0(9)\d{9}$/, { message: "Invalid Phone No." }),
  password: z.string(),
});

export const SForgotPass = z.object({
  mobileNo: z.string().regex(/^0(9)\d{9}$/, { message: "Invalid Phone No." }),
  password: z.string(),
  newPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be at least 8 characters with uppercase and lowercase with number and special characters",
      }
    ),
});

export type TRegister = z.infer<typeof SRegister>;
export type TLoginAdmin = z.infer<typeof SLoginAdmin>;
export type TRegisterResident = z.infer<typeof SRegisterResident>;
export type TForgotPassword = z.infer<typeof SForgotPass>;
