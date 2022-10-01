import { Prisma } from "../../utils/prismaClient";
import { TCreateSchedule } from "./schedZod";

export class SchedUtils extends Prisma {
  public data;

  constructor(data?: TCreateSchedule) {
    super();
    this.data = data;
  }

  public async createSchedule() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const schedule = await this.prisma.schedule.create({ data: this.data });

      return schedule;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getSchedule(id: string) {
    try {
      const schedule = await this.prisma.schedule.findMany({
        where: { programId: id },
      });

      return [...schedule];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async deleteSchedule(id: number) {
    try {
      const schedule = await this.prisma.schedule.delete({ where: { id: id } });

      return { ...schedule };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
