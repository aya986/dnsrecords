import createHttpError from "http-errors";
import Joi from "joi";
import CheckDns from "@classes/CheckDns";

class DomainController {
  async checkDomain(req, res, next) {
    try {
      const schema = Joi.object({
        domain: Joi.string().domain().required(),
      });

      await schema.validateAsync(req.query);

      const domain = req.query.domain;

      const domainInfo = await CheckDns.domainInfo(domain);
      return res.status(200).json({
        domain,
        domainInfo: domainInfo,
      });
    } catch (err) {
      next(createHttpError(err));
    }
  }
}

export default DomainController;
