import { z } from "zod";

export const STransaction = z.object({
  residentId: z.number().min(0),
  scheduleId: z.number().min(0),
  programId: z.string(),
  status: z.string(),
  brgyId: z.string(),
  remarks: z
    .string()
    .min(3, { message: "Remarks needs to be atleast 3 letters" })
    .optional(),
});

export type TTransaction = z.infer<typeof STransaction>;
