import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authHandler from "../middleWare/authHandler";
import {
  activateUser,
  getResidents,
  getUsers,
  findUser,
  login,
  registerAdmin,
  updateAdmin,
  registerResident,
  updateResident,
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

  router.route("/findId").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (!req.query.id) {
        throw new Error("Provide an ID");
      }

      const data = await findUser(parseInt(req.query.id.toString()));

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
    authHandler,
    expressAsyncHandler(async (req: Request, res: Response) => {
      const role = req.params.role;

      if (role.toString() === "admin") {
        const data = await registerAdmin(req.body);
        res.json({ ...data });
        return;
      }

      if (req.user.role === "Admin") {
        throw new Error("Only Brgy. Admin can use this.");
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

  router.route("/update/:role").put(
    authHandler,
    expressAsyncHandler(async (req: Request, res: Response) => {
      const role = req.params.role;

      if (req.user.role === "Brgy. Admin") {
        throw new Error("Master Admin & Admin can only use this");
      }

      if (!req.query.id) {
        throw new Error("Provide an id");
      }

      if (role.toString() === "admin") {
        const data = await updateAdmin(
          req.body,
          parseInt(req.query.id.toString())
        );
        res.json({ ...data });
        return;
      }

      if (role.toString() === "resident") {
        const data = await updateResident(
          {
            data: req.body.data,
            residentData: req.body.residentData,
          },
          parseInt(req.query.id.toString())
        );

        res.json({ ...data });

        return;
      }
    })
  );

  router.route("/activate").post(
    authHandler,
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (req.user.role === "Brgy. Admin") {
        throw new Error("Master Admin & Admin can only use this");
      }

      if (!req.query.id) {
        throw new Error("Please provide an ID");
      }

      const activate = await activateUser(Number(req.query.id));

      res.json({ ...activate });
    })
  );

  return router;
}
