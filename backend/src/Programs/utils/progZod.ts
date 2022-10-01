import { z } from "zod";

export const SCreateProgram = z.object({
  id: z.string(),
  name: z.string(),
  details: z.string(),
  view: z.enum(["Brgy. Admin", "Admin", "Master Admin", "All"]),
  qualification: z.enum(["6months of Residency", "Registered Voter"]),
  brgyId: z.string(),
  status: z.enum(["Ongoing", "Pending", "Completed"]),
  type: z.enum(["Goods Aid", "Financial Aid", "Goods & Financial"]),
});

export type TCreateProgram = z.infer<typeof SCreateProgram>;
