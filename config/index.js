const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  passcode: process.env.PASSCODE,
};
