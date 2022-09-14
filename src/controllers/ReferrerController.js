import createHttpError from "http-errors";
import Joi from "joi";
class ReferrerController {

  async setReferrer(req, res, next) {
    try {
      const schema = Joi.object({
        domain: Joi.string().domain().required(),
      });

      // await schema.validateAsync(req.query);

      let domain = req.query.domain;

      let code = Math.ceil( Math.random()*1000000);
      domain = `http://localhost:3000/v1/pukketWord/${code}`;

      return res.render("redirect", { title: "Redirect", domain: domain });
    } catch (err) {
      next(createHttpError(err));
    }
  }

  async showReferrer(req, res, next) {
    try {
      console.log("====================================");
      console.log(req.params);
      console.log(req.headers['referer']);
      console.log("====================================");
      return res.render("displayCode", { title: "Redirect",domain:"http://google.com"});
    } catch (err) {
      next(createHttpError(err));
    }
  }
}

export default ReferrerController;
