import { ZodError } from "zod";
import AnnouncementsUtils from "./utils/AnnouncementUtils";
import { SAnnouncements, TAnnouncements } from "./utils/Zod";

export async function getAnnouncements() {
  try {
    const annUtils = new AnnouncementsUtils(undefined);

    const annData = await annUtils.getAnn();

    return { ...annData };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
export async function postAnnouncements(data: TAnnouncements) {
  try {
    SAnnouncements.parse(data);

    const annUtils = new AnnouncementsUtils(data);

    const annData = await annUtils.postAnn();

    return { ...annData };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function deleteAnnouncements(id: string) {
  try {
    const annUtils = new AnnouncementsUtils(undefined);

    const annData = await annUtils.deleteAnn(id);

    return { ...annData };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
