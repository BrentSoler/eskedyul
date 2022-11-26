import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authHandler from "../middleWare/authHandler";
import { deleteBrgy, postBrgy } from "./controller";

export default function BrgyRoutes(router: Router) {
  router.route("/post").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await postBrgy(req.body);

      res.json({ ...data });
    })
  );

  router.route("/delete").delete(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const { id } = req.query;

      if (!id) {
        throw new Error("Provide an ID");
      }

      const data = await deleteBrgy(id.toString());

      res.json({ ...data });
    })
  );

  return router;
}
