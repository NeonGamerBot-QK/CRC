const path = require("path");
require("dotenv").config();
module.exports = {
  //        env port            pterodactyl server port     Web server Port       default port
  port:
    process.env.PORT || process.env.SERVER_PORT || process.env.WEB_PORT || 3000,
  // host: process.env.HOST || null
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    secure: process.env.EMAIL_SECURE === "true",
  },
  myEmail: process.env.MY_EMAIL_ADDRESS,
  dbPath:
    process.env.DB_PATH ||
    process.env.STORE_PATH ||
    path.join(__dirname, "db.json"),
  password: process.env.PASSWORD || "changeme",
};
