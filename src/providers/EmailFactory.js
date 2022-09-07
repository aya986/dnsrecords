import config from "@config/index";
import createHttpError from "http-errors";
import SMTP from "./SMTP";
import Mailchimp from "./Mailchimp";

class EmailFactory {
  static create(type) {
    try {
      switch (type) {
        case "SMTP":
          return new SMTP();
        case "mailchimp":
          return new Mailchimp();
        default:
          createHttpError(404, "Invalid type");
          break;
      }
    } catch (error) {
      return null;
    }
  }
}

export default EmailFactory;
