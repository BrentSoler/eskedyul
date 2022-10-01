import { PrismaClient } from "@prisma/client";

export class Prisma {
  public prisma = new PrismaClient({ errorFormat: "minimal" });
}
