import createHttpError from "http-errors";
import Joi from "joi";
import CheckDns from "@classes/CheckDns";
import EmailFactory from "@providers/EmailFactory";
import { getBusinessCloud } from "@models/pg/BusinessCloud";
import config from "@config/";

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

  async sendEmail(req, res, next) {
    try {
      const schema = Joi.object({
        business_id: Joi.string().optional(),
      });

      await schema.validateAsync(req.query);
      const businessCloud = await getBusinessCloud(req.business_id);
      let type = businessCloud?.platform == "mailchimp" ? "mailchimp" : "SMTP";

      let token = config.mailchimp.api_key;
      token = businessCloud?.access_token;

      let object = new EmailFactory.create(type, {
        token: token,
      });
      if (object == null) {
        createHttpError(404, "Error on send mail");
      }

      let to = "ayoob.khodadadi@gmail.com";
      let subject = "title";
      let body = "body";
      let result = await object.send(to, subject, body);
      return res.status(200).json({
        result
      });
    } catch (err) {
      next(createHttpError(err));
    }
  }
}

export default DomainController;
