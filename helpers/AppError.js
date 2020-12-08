/**
 * code 1: from joi validation
 * code 2: from mongoose
 * code 3: from mongoDB
 * code 8: blocked editing, cron job
 * code 9: authentication failed
 */
class AppError extends Error {
  constructor(status, code, message) {
    super();
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

module.exports = AppError;
