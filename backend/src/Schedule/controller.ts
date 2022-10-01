import { ZodError } from "zod";
import { SchedUtils } from "./utils/schedUtils";
import { SCreateSchedule, TCreateSchedule } from "./utils/schedZod";

export async function postSchedule(data: TCreateSchedule) {
  try {
    SCreateSchedule.parse(data);

    const Schedule = new SchedUtils(data);

    const createSched = await Schedule.createSchedule();

    return createSched;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function getSchedule(id: string) {
  try {
    const Schedule = new SchedUtils();

    const createSched = await Schedule.getSchedule(id);

    return createSched.length > 0 ? { data: createSched } : { data: "No Data" };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function deleteSchedule(id: number) {
  try {
    const Schedule = new SchedUtils();

    const deleteSched = await Schedule.deleteSchedule(id);

    return deleteSched;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
