import { Prisma } from "../../utils/prismaClient";
import { TBrgy } from "./BrgyZod";

export class BrgyUtils extends Prisma {
  public data;

  constructor(data: TBrgy | undefined) {
    super();
    this.data = data;
  }

  postBrgy() {
    try {
      if (!this.data) {
        throw new Error("Missing fields");
      }

      const brgyData = this.prisma.barangay.create({
        data: {
          ...this.data,
        },
      });

      return brgyData;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  deleteBrgy(id: string) {
    try {
      if (!id) {
        throw new Error("Missing fields");
      }

      const brgyData = this.prisma.barangay.delete({
        where: {
          id: id.toString(),
        },
      });

      return brgyData;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
