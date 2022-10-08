import { Prisma } from "../../utils/prismaClient";
import { TRegister, TRegisterResident } from "./userZod";

export default class UserUtil extends Prisma {
  public data;

  constructor({ data }: { data: TRegister | undefined }) {
    super();
    this.data = data;
  }

  public async isNameAvailable() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const { fname, lname, mname } = this.data;

      const findUser = await this.prisma.Users.findFirst({
        where: {
          fname: fname,
          lname: lname,
          mname: mname,
        },
      });

      if (!findUser) {
        return false;
      }

      return { ...findUser };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getUsers(id: string) {
    try {
      const findUser = await this.prisma.users.findMany({
        where: {
          brgyId: id,
        },
        include: {
          residents: true,
        },
      });

      return [...findUser];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getResidents(id: string) {
    try {
      const findUser = await this.prisma.users.findMany({
        where: {
          brgyId: id,
          role: "Resident",
        },
        include: {
          residents: true,
        },
      });

      return [...findUser];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async isNumberAvailable(mobileNo?: string) {
    try {
      const findNumber = await this.prisma.users.findFirst({
        where: {
          mobileNo: mobileNo ? mobileNo : (this.data?.mobileNo as string),
        },
      });

      if (!findNumber) {
        return false;
      }

      return findNumber;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async registerUser() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const postUser = await this.prisma.users.create({
        data: {
          ...this.data,
        },
      });

      return postUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async updateUser(id: number) {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const postUser = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: {
          ...this.data,
        },
      });

      return postUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async updateResident(id: number, resiData: any) {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const postUser = await this.prisma.residents.update({
        where: {
          id: id,
        },
        data: {
          ...resiData,
        },
      });

      return postUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async findUserId(id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return false;
      }

      return {
        id: user.id,
        role: user.role,
        email: user.email ? user.email : "",
        mobileNo: user.mobileNo,
        brgyId: user.brgyId,
        status: user.status,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async findId(id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          residents: true,
        },
      });

      if (!user) {
        return false;
      }

      return { ...user };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async registerResident(resData: TRegisterResident) {
    try {
      const postResident = await this.prisma.residents.create({
        data: {
          id: Number(resData.id),
          birthdate: resData.birthdate.toString(),
          birthPlace: resData.birthPlace.toString(),
          civilStatus: resData.civilStatus.toString(),
          emgContName: resData.emgContName.toString(),
          emgContNum: resData.emgContNum.toString(),
          empStatus: resData.empStatus.toString(),
          OSCAId: resData.OSCAId ? resData.OSCAId.toString() : "",
          residencyStatus: resData.residencyStatus.toString(),
          seniorType: resData.seniorType.toString(),
          userId: Number(resData.userId),
        },
      });

      return postResident;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async activateUser(id: number, status: number) {
    try {
      const activatedUser = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });

      return activatedUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
