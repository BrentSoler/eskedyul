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
    .min(3, { message: "First name needs to be atleast 3 letters" })
    .regex(/^[A-Za-z ]+$/, { message: "First name should only consist of letters" }),
  mname: z
    .union([
      z.string().length(0),
      z.string().min(2,{ message: "Middle name needs to be atleast 2 letters" }),
      z.string().regex(/^[A-Za-z ]+$/, { message: "Middle name should only consist of letters" })
    ])
    .optional()
    .transform(e => e === "" ? undefined : e),
  lname: z
    .string()
    .min(2, { message: "Last name needs to be atleast 2 letters" })
    .regex(/^[A-Za-z ]+$/, { message: "Last name should only consist of letters" }),
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
    .min(3, { message: "Emergency Contact Name needs to be atleast 3 letters" })
    .regex(/^[A-Za-z i]+$/, { message: "Emergency Contact Name should only consist of letters" })
    .optional(),
  civilStatus: z.enum(["Single", "Married", "Divorced"]),
  birthdate: z.string(),
  birthPlace: z.string(),
  OSCAId: z
    .string()
    .regex(/^[0-9]$/, { message: "OSCA ID needs to be numbers only" })
    .optional(),
  empStatus: z.enum(["Employed", "Retired w/pension", "Retired wo/ pension"]),
  residencyStatus: z.enum(["6months of Residency", "Registered Voter"]),
  remarks: z
    .string()
    .min(3, { message: "Remarks needs to be atleast 3 letters" })
    .optional(),
});

export const SLoginAdmin = z.object({
  mobileNo: z.string().regex(/^0(9)\d{9}$/, { message: "Invalid Phone No." }),
  password: z.string(),
});

export const SForgotPass = z.object({
  mobileNo: z.string().regex(/^0(9)\d{9}$/, { message: "Invalid Phone No." }),
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
