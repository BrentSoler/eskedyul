import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authHandler from "../middleWare/authHandler";
import {
  createProgram,
  deleteProgram,
  findProgram,
  getPrograms,
  updateProgram,
} from "./controller";

export default function ProgramsRouter(router: Router) {
  router
    .route("/")
    .post(
      authHandler,
      expressAsyncHandler(async (req: Request, res: Response) => {
        if (req.user.role !== "Master Admin") {
          throw new Error("Master Admin can only use this");
        }

        req.body.brgyId = req.user.brgyId;
        req.body.status = "Pending";

        const data = await createProgram(req.body);

        res.json({ ...data });
      })
    )
    .get(
      expressAsyncHandler(async (req: Request, res: Response) => {
        if (!req.query.brgy) {
          throw new Error("Provide a Brgy ID");
        }

        const data = await getPrograms(req.query.brgy.toString());

        res.json({ ...data });
      })
    )
    .put(
      authHandler,
      expressAsyncHandler(async (req: Request, res: Response) => {
        if (req.user.role !== "Master Admin") {
          throw new Error("Master Admin can only use this");
        }

        req.body.brgyId = req.user.brgyId;

        if (!req.query.id) {
          throw new Error("Provide an ID");
        }

        const data = await updateProgram(req.body, req.query.id.toString());

        res.json({ ...data });
      })
    )
    .delete(
      authHandler,
      expressAsyncHandler(async (req: Request, res: Response) => {
        if (req.user.role !== "Master Admin") {
          throw new Error("Master Admin can only use this");
        }

        if (!req.query.id) {
          throw new Error("Provide an ID");
        }

        const data = await deleteProgram(req.query.id.toString());

        res.json({ ...data });
      })
    );

  router.route("/getID").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (!req.query.id) {
        throw new Error("Provide a Brgy ID");
      }

      const data = await findProgram(req.query.id.toString());

      res.json({ ...data });
    })
  );

  router.route("/reports").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (!req.query.id) {
        throw new Error("Provide a Program ID");
      }

      const data = await findProgram(req.query.id.toString());

      res.json({ ...data });
    })
  );
  return router;
}
