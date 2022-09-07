import dotenv from "dotenv";
dotenv.config();

let config = {
  app_url: process.env.APP_URL || "locahost:3000",
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
    subject: process.env.EMAIL_SUBJECT || process.env.APP_NAME || "Porkaran",
    from: process.env.EMAIL_FROM,
  },
  mailchimp: {
    api_key: process.env.MAILCHIMP_API_KEY,
    server_prefix: process.env.YOUR_SERVER_PREFIX
  }
}
export default config;
