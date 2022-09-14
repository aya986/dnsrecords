import { Router } from "express";
import DomainController from "@controllers/DomainController";
import Joi from "joi";
import ReferrerController from "@controllers/ReferrerController";

const router = Router();

const domainController = new DomainController();
const referrerController = new ReferrerController();

router.get(
  "/checkDomain",
  domainController.checkDomain.bind(domainController)
);

router.get(
  "/setReferrer",
  referrerController.setReferrer.bind(referrerController)
);

router.get(
  "/pukketWord/:code",
  referrerController.showReferrer.bind(referrerController)
);

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
