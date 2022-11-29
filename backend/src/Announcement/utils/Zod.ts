import { z } from "zod";

export const SAnnouncements = z.object({
  title: z
    .string()
    .min(3, { message: "Title needs to be atleast 3 letters long" }),
  details: z
    .string()
    .min(3, { message: "Title needs to be atleast 3 letters long" }),
  barangay: z.string(),
});

export type TAnnouncements = z.infer<typeof SAnnouncements>;
