declare namespace Express {
  export interface Request {
    user: Users;
  }
}

type Users = {
  id: number;
  role: string;
  email: string;
  password: string;
  mobileNo: string;
  brgyId: string;
};
