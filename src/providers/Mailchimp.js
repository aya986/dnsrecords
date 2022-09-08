import mailchimpTx from "@mailchimp/mailchimp_transactional";

import config from "@config/index";
import Email from "./Email";

class Mailchimp extends Email {
  token = "";
  constructor(token) {
    super();
    this.token = token;
  }

  async send(to, subject, body) {
    try {
      let mailchimpClient = mailchimpTx(this.token);

      const response = await mailchimpClient.users.ping();
      console.log(response);

      let message = {
        subject: subject,
        text: body,
        from_email: "ayoob.khodadadi@gmail.com",
        from_name: "ayoob.khodadadi",
        to: [
          {
            email: to,
          },
        ],
      };

      const sendResults = await mailchimpClient.messages.send({
        message: message,
      });
      let sendResult = sendResults.shift();

      if (sendResult?.status == "rejected") {
        console.log(
          `mail was rejected because ${sendResult?.reject_reason}`,
          sendResult
        );
      }

      return sendResult?.status == "sent";
    } catch (error) {
      return false;
    }
  }
}

export default Mailchimp;
