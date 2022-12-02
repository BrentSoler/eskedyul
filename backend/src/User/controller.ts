import { ZodError } from "zod";
import { Encryption } from "../utils/encryption";
import Validation from "../utils/validation";
import UserUtil from "./utils/userUtil";
import {
  SForgotPass,
  SLoginAdmin,
  SRegister,
  SRegisterResident,
  TForgotPassword,
  TLoginAdmin,
  TRegister,
  TRegisterResident,
} from "./utils/userZod";

export async function login(data: TLoginAdmin) {
  try {
    SLoginAdmin.parse(data);

    const User = new UserUtil({ data: undefined });
    const Encrypt = new Encryption(data.password);

    const mobileNumber = await User.isNumberAvailable(data.mobileNo as string);

    if (!mobileNumber) {
      throw new Error("MobileNo. does not exists please make an account");
    }

    if (mobileNumber.role === "Resident") {
      throw new Error("You are not an admin");
    }

    if (!(await Encrypt.decryptPassword(mobileNumber.password as string))) {
      throw new Error("Wrong Password");
    }

    if (mobileNumber.status === 0) {
      throw new Error("You are not activated yet");
    }

    const token = Encrypt.generateToken(mobileNumber.id, data.password);

    return { token, ...mobileNumber };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function registerAdmin(data: TRegister) {
  try {
    SRegister.parse(data);

    const Validator = new Validation(data);
    const User = new UserUtil({ data: data });

    Validator.register(["email", "password"]);
    Validator.validate();

    const userNameAvailable = await User.isNameAvailable();
    const mobileAvailable = await User.isNumberAvailable();

    if (userNameAvailable) {
      throw new Error("Name is already taken");
    }
    if (mobileAvailable) {
      throw new Error("Mobile No. is already taken");
    }

    const encrypt = new Encryption(data.password || "");
    const hashedPass = await encrypt.hashPassword();

    if (!User.data) {
      throw new Error("Error Occured while excrypting password");
    }

    User.data.password = hashedPass;

    const postUser = await User.registerUser();

    return postUser;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function updateAdmin(data: TRegister, id: number) {
  try {
    SRegister.parse(data);

    const Validator = new Validation(data);

    const User = new UserUtil({ data: data });

    Validator.register(["email"]);
    Validator.validate();

    const findId = await User.findUserId(id);

    if (!findId) {
      throw new Error("User does not Exists");
    }

    const userNameAvailable = await User.isNameAvailable();
    const mobileAvailable = await User.isNumberAvailable();

    if (userNameAvailable && userNameAvailable.id !== id) {
      throw new Error("Name is already taken");
    }
    if (mobileAvailable && mobileAvailable.id !== id) {
      throw new Error("Mobile No. is already taken");
    }

    const postUser = await User.updateUser(id);

    return postUser;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function updateResident(
  {
    data,
    residentData,
  }: {
    data: TRegister;
    residentData: TRegisterResident;
  },
  id: number
) {
  try {
    SRegister.parse(data);
    SRegisterResident.parse(residentData);

    const User = new UserUtil({ data: data });

    const findId = await User.findUserId(id);

    if (!findId) {
      throw new Error("User does not Exists");
    }

    const userNameAvailable = await User.isNameAvailable();
    const mobileAvailable = await User.isNumberAvailable();

    if (userNameAvailable && userNameAvailable.id !== id) {
      throw new Error("Name is already taken");
    }

    if (mobileAvailable && mobileAvailable.id !== id) {
      throw new Error("Mobile No. is already taken");
    }

    const postUser = await User.updateUser(id);
    const postResident = await User.updateResident(id, residentData);

    return { postUser, postResident };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function registerResident({
  data,
  residentData,
}: {
  data: TRegister;
  residentData: TRegisterResident;
}) {
  try {
    SRegister.parse(data);
    SRegisterResident.parse(residentData);

    const User = new UserUtil({ data: data });

    const userNameAvailable = await User.isNameAvailable();
    const mobileAvailable = await User.isNumberAvailable();

    if (userNameAvailable) {
      throw new Error("Name is already exists.");
    }
    if (mobileAvailable) {
      throw new Error("Mobile No. is already exists");
    }

    const postUser = await User.registerUser();

    residentData.id = postUser.id;
    residentData.userId = postUser.id;

    const postResident = await User.registerResident(residentData);

    return { ...postUser, ...postResident };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function activateUser(id: number) {
  try {
    const User = new UserUtil({ data: undefined });

    const userExists = await User.findUserId(id);

    if (!userExists) {
      throw new Error("User does not Exists");
    }

    const activate = await User.activateUser(
      id,
      userExists.status === 0 ? 1 : 0
    );

    return { ...activate };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function changePasswordUser(data: TForgotPassword) {
  try {
    SForgotPass.parse(data);

    const User = new UserUtil({ data: undefined });

    const mobileNumber = await User.isNumberAvailable(data.mobileNo as string);

    if (!mobileNumber) {
      throw new Error("Mobile No. does not exists please make an account");
    }

    if (mobileNumber.role === "Resident") {
      throw new Error("You are not an admin");
    }

    const Encrypt = new Encryption(data.newPassword);
    const hashedPass = await Encrypt.hashPassword();

    data.newPassword = hashedPass;

    const update = await User.UpdtPassword(data.mobileNo, data.newPassword);

    return {
      update,
    };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function getUsers(id: string) {
  try {
    const User = new UserUtil({ data: undefined });

    const users = await User.getUsers(id);

    return users.length > 0 ? { data: users } : { data: "No Data" };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function findUser(id: number) {
  try {
    const User = new UserUtil({ data: undefined });

    const users = await User.findId(id);

    if (!users) {
      throw new Error("User does not Exists");
    }

    return { ...users };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function getResidents(id: string) {
  try {
    const User = new UserUtil({ data: undefined });

    const users = await User.getResidents(id);

    return users.length > 0 ? { data: users } : { data: "No Data" };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
