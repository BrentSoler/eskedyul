import { z } from "zod";


export const SCreateSchedule = z.object(
  {
  startTime: z.string(),
  endTime: z.string(),
  date: z.string(),
  location: z
    .string()
    .min(3, { message: "Location need to be atleast 3 letters long" }),
  programId: z.string(),
});

export type TCreateSchedule = z.infer<typeof SCreateSchedule>;
