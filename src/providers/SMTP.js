import nodemailer from "nodemailer";

import config from "@config/index";
import Email from "./Email";

class SMTP extends Email {
  async send(to, subject, body) {
    if (!this.transport) {
      this.getConnection();
    }

    const sendMail = await this.transport.sendMail({
      from: config.email.from,
      to,
      subject: `${config.email.subject} | ${subject}`,
      html: body,
    });
    console.log(sendMail);
    if (!sendMail) {
      throw new Error("Error on send mail by SMTP");
    }
    return true;
  }

  async getConnection() {
    const transport = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
    this.transport = transport;
  }
}

export default SMTP;
