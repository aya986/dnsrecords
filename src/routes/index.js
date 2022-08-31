import { Router } from "express";

import v1Routes from "./v1";

const router = Router();

/* GET home page. */
router.get("/", async (req, res, next) => {

  res.render("index", { title: "Express" });
});
router.use("/v1", v1Routes);

export default router;
