import createHttpError from "http-errors";
import Joi from "joi";
import CheckDns from "@classes/CheckDns";
import EmailFactory from "@providers/EmailFactory";

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
      let tyep = "mailchimp"; // or SMTP
      let object = new EmailFactory.create(tyep);
      if (!object) {
        createHttpError(404, "Error on send mail");
      }

      let to = "ayoob.khodadadi@gmail.com";
      let subject = "title";
      let body = "body";
      await object.send(to, subject, body);
      return res.status(200).json({});
    } catch (err) {
      next(createHttpError(err));
    }
  }
}

export default DomainController;
