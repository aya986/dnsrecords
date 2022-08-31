import { Router } from "express";
import Joi from "joi";

import downloadsRouter from "./domains";

const router = Router();

// router.use("/install", installRoutes);
// router.use("/auth", authRoutes);
router.use(downloadsRouter);

// Health-check Endpoint
router.get('/health', (_req, res) => { res.send('200') })

router.use((err, req, res, next) => {
  console.log(err);
  if (Joi.isError(err)) {
    err.status = 422;
  }
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
  });
});

export default router;
