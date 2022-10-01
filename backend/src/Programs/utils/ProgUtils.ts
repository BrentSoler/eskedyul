import { Prisma } from "../../utils/prismaClient";
import { TCreateProgram } from "./progZod";

export class ProgUtils extends Prisma {
  public data;

  constructor(data?: TCreateProgram) {
    super();
    this.data = data;
  }

  public async findProgram() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const program = await this.prisma.program.findFirst({
        where: { name: this.data.name },
      });

      if (!program) {
        return false;
      }

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async createProgram() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const program = await this.prisma.program.create({ data: this.data });

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async updateProgram(id: string) {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const program = await this.prisma.program.update({
        where: { id: id },
        data: this.data,
      });

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async deleteProgram(id: string) {
    try {
      const program = await this.prisma.program.delete({
        where: {
          id: id,
        },
        include: {
          schedule: true,
        },
      });

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public async deleteEditingProgram() {
    try {
      const program = await this.prisma.program.deleteMany({
        where: {
          name: "Editing",
        },
      });

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getReport(id: string) {
    try {
      const pending = await this.prisma.transaction.findMany({
        where: {
          status: "Pending",
          program: {
            id: id,
          },
        },
        select: {
          id: true,
          program: {
            select: {
              name: true,
            },
          },
        },
      });
      const completed = await this.prisma.transaction.findMany({
        where: {
          status: "Completed",
          program: {
            id: id,
          },
        },
      });
      const cancelled = await this.prisma.transaction.findMany({
        where: {
          status: "Cancelled",
          program: {
            id: id,
          },
        },
      });

      return {
        prog: pending,
        pending: pending.length,
        completed: completed.length,
        cancelled: cancelled.length,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async findId(id: string) {
    try {
      const program = await this.prisma.program.findUnique({
        where: { id: id },
        include: {
          schedule: true,
        },
      });

      if (!program) {
        return false;
      }

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async statusToCancel(id: string) {
    try {
      const program = await this.prisma.transaction.updateMany({
        where: { programId: id },
        data: {
          status: "Cancelled",
        },
      });

      if (!program) {
        return false;
      }

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getProgram(id: string) {
    try {
      const program = await this.prisma.program.findMany({
        where: { brgyId: id, name: { not: "Editing" } },
        include: {
          schedule: true,
          barangay: true,
        },
      });

      return [...program];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
