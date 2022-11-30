import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { deleteBrgy, getBrgy, postBrgy } from "./controller";

export default function BrgyRoutes(router: Router) {
  router.route("/").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await getBrgy();

      res.json({ ...data });
    })
  );
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
