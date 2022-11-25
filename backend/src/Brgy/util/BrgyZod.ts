import { z } from "zod";

export const SBrgy = z.object({
  id: z.string(),
  zone: z.string(),
  districtId: z.number(),
});

export type TBrgy = z.infer<typeof SBrgy>;
