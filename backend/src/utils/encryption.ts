import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class Encryption {
  private password;

  constructor(password: string) {
    this.password = password;
  }

  public async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);

    return hashedPass;
  }

  public async decryptPassword(password: string) {
    if (!(await bcrypt.compare(this.password, password))) {
      return false;
    }
    return true;
  }

  public decryptToken() {
    return jwt.decode(this.password);
  }

  public generateToken(id: number, password: string) {
    return jwt.sign({ id, password }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
  }
}
