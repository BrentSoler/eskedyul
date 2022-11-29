import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  deleteAnnouncements,
  getAnnouncements,
  postAnnouncements,
} from "./controller";

export default function AnnouncementRoutes(router: Router) {
  router.route("/").get(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await getAnnouncements();

      res.json({ ...data });
    })
  );

  router.route("/post").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await postAnnouncements(req.body);

      res.json({ ...data });
    })
  );

  router.route("/delete").delete(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const { id } = req.query;

      if (!id) {
        throw new Error("Provide an ID");
      }

      const data = await deleteAnnouncements(id.toString());

      res.json({ ...data });
    })
  );

  return router;
}
