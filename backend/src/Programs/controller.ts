import { ZodError } from "zod";
import { ProgUtils } from "./utils/ProgUtils";
import { SCreateProgram, TCreateProgram } from "./utils/progZod";

export async function createProgram(data: TCreateProgram) {
  try {
    SCreateProgram.parse(data);

    const Program = new ProgUtils(data);

    const checkName = await Program.findProgram();

    await Program.deleteEditingProgram();

    if (
      checkName &&
      checkName.brgyId === data.brgyId &&
      checkName.name !== "Editing"
    ) {
      throw new Error("Program name already exists");
    }

    const create = await Program.createProgram();

    return create;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function getPrograms(id: string) {
  try {
    const Program = new ProgUtils();

    const create = await Program.getProgram(id);

    return create.length > 0 ? { data: [...create] } : { data: "No Data" };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function updateProgram(data: TCreateProgram, id: string) {
  try {
    SCreateProgram.parse(data);

    const Program = new ProgUtils(data);

    const findId = await Program.findId(id);

    if (!findId) {
      throw new Error("Program does not exists");
    }

    const checkName = await Program.findProgram();

    if (findId.id !== id && findId.brgyId === data.brgyId && checkName) {
      throw new Error("Program name already exists");
    }

    const update = await Program.updateProgram(id);

    return update;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function deleteProgram(id: string) {
  try {
    const Program = new ProgUtils();

    const findId = await Program.findId(id);

    if (!findId) {
      throw new Error("Program does not exists");
    }

    await Program.statusToCancel(id);
    const deleted = await Program.deleteProgram(id);

    return deleted;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
export async function findProgram(id: string) {
  try {
    const Program = new ProgUtils();

    const findId = await Program.findId(id);

    if (!findId) {
      throw new Error("Program does not exists");
    }

    return findId;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function getReports(id: string) {
  try {
    const Program = new ProgUtils();

    const programs = await Program.getProgram(id);

    if (programs.length <= 0) {
      return { data: "No Data" };
    }

    const arr: any[] = await Promise.all(
      programs.map(async (program) => {
        const report = await Program.getReport(program.id);
        return report;
      })
    );

    return { data: arr };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
