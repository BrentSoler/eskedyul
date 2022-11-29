import { Prisma } from "../../utils/prismaClient";
import { TAnnouncements } from "./Zod";

export default class AnnouncementsUtils extends Prisma {
  public data;

  constructor(data: TAnnouncements | undefined) {
    super();
    this.data = data;
  }

  async getAnn() {
    try {
      const ann = await this.prisma.announcements.findMany();

      return { data: ann };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async postAnn() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const ann = await this.prisma.announcements.create({
        data: {
          ...this.data,
        },
      });

      return ann;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteAnn(id: string) {
    try {
      const ann = await this.prisma.announcements.delete({
        where: {
          id: parseInt(id),
        },
      });

      return ann;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
