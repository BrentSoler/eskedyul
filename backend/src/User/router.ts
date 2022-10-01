import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authHandler from "../middleWare/authHandler";
import {
  activateUser,
  getResidents,
  getUsers,
  login,
  registerAdmin,
  registerResident,
} from "./controller";

export default function userRoutes(router: Router) {
  router.route("/").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (!req.query.id) {
        throw new Error("Provide an ID");
      }

      const data = await getUsers(req.query.id.toString());

      res.json({ ...data });
    })
  );

  router.route("/residents").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (!req.query.id) {
        throw new Error("Provide an ID");
      }

      const data = await getResidents(req.query.id.toString());

      res.json({ ...data });
    })
  );

  router.route("/login").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await login(req.body);

      res.json({ ...data });
    })
  );

  router.route("/register/:role").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const role = req.params.role;

      if (role.toString() === "admin") {
        const data = await registerAdmin(req.body);
        res.json({ ...data });

        return;
      }

      if (role.toString() === "resident") {
        const data = await registerResident({
          data: req.body.data,
          residentData: req.body.residentData,
        });

        res.json({ ...data });

        return;
      }
    })
  );

  router.route("/activate").post(
    authHandler,
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (!req.query.id) {
        throw new Error("Please provide an ID");
      }

      const activate = await activateUser(Number(req.query.id));

      res.json({ ...activate });
    })
  );

  return router;
}
