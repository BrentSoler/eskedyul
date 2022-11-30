import { ZodError } from "zod";
import { BrgyUtils } from "./util/BrgyUtils";
import { SBrgy, TBrgy } from "./util/BrgyZod";

export async function getBrgy() {
  try {
    const brgy = new BrgyUtils(undefined);

    const postData = brgy.getBrgy();

    return postData;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function postBrgy(data: TBrgy) {
  try {
    SBrgy.parse(data);

    const brgy = new BrgyUtils(data);

    const postData = brgy.postBrgy();

    return postData;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function deleteBrgy(id: string) {
  try {
    const brgy = new BrgyUtils(undefined);

    const postData = brgy.deleteBrgy(id);

    return postData;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
