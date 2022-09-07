import mailchimpTx from "@mailchimp/mailchimp_transactional";

import config from "@config/index";
import Email from "./Email";

class Mailchimp extends Email {
  async send(to, subject, body) {
    let mailchimpClient = mailchimpTx(config.mailchimp.api_key);

    const response = await mailchimpClient.users.ping();
    console.log(response);

    const sendMail = await mailchimpClient.messages.send({ message: {} });

    console.log(sendMail);
    if (!sendMail) {
      throw new Error("Error on send mail by Mailchimp");
    }
    return true;
  }
}

export default Mailchimp;
