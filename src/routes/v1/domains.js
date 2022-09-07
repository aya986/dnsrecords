import { Router } from "express";

import DomainController from "@controllers/DomainController";

const router = Router();
const domainController = new DomainController();

router.get(
  "/checkDomain",
  domainController.checkDomain.bind(domainController)
);

router.get(
  "/sendEmail",
  domainController.sendEmail.bind(domainController)
);

export default router;
