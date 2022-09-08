import config from "@config/index";
import createHttpError from "http-errors";
import SMTP from "./SMTP";
import Mailchimp from "./Mailchimp";

class EmailFactory {
  static create(type, params = {token: ""}) {
    switch (type) {
      case "SMTP":
        return new SMTP();
      case "mailchimp":
        return new Mailchimp(params.token);
      default:
        createHttpError(404, "Invalid type");
        break;
    }
  }
}

export default EmailFactory;
