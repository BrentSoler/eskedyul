import { z } from "zod";

export const STransaction = z.object({
  residentId: z.number().min(0),
  scheduleId: z.number().min(0),
  programId: z.string(),
  status: z.string(),
  brgyId: z.string(),
});

export type TTransaction = z.infer<typeof STransaction>;
