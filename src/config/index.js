import dotenv from "dotenv";
dotenv.config();

let config = {
  app_url: process.env.APP_URL || "locahost:3000",
}
export default config;
