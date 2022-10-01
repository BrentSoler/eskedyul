import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authHandler from "../middleWare/authHandler";
import {
  deleteTransaction,
  findTransaction,
  getTransaction,
  postTransaction,
  updateTransaction,
} from "./controller";

export default function TransactionRoutes(router: Router) {
  router
    .route("/")
    .post(
      authHandler,
      expressAsyncHandler(async (req: Request, res: Response) => {
        if (req.user.role !== "Master Admin") {
          throw new Error("Master Admin can only use this");
        }

        req.body.status = "Pending";
        req.body.brgyId = req.user.brgyId;

        const data = await postTransaction(req.body);

        res.json({ ...data });
      })
    )
    .get(
      expressAsyncHandler(async (req: Request, res: Response) => {
        if (!req.query.brgyId) {
          throw new Error("Provide an ID");
        }

        const data = await getTransaction(req.query.brgyId.toString());

        res.json({ ...data });
      })
    )
    .put(
      authHandler,
      expressAsyncHandler(async (req: Request, res: Response) => {
        if (req.user.role !== "Master Admin") {
          throw new Error("Master Admin can only use this");
        }

        if (!req.query.id) {
          throw new Error("Provide an ID");
        }

        req.body.brgyId = req.user.brgyId;

        const data = await updateTransaction(
          req.body,
          parseInt(req.query.id.toString())
        );

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

        req.body.brgyId = req.user.brgyId;

        const data = await deleteTransaction(parseInt(req.query.id.toString()));

        res.json({ ...data });
      })
    );

  router.route("/getID").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (!req.query.id) {
        throw new Error("Provide an ID");
      }

      const data = await findTransaction(parseInt(req.query.id.toString()));

      res.json({ ...data });
    })
  );

  return router;
}
