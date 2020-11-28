class ApiResponse {
  constructor(success, result, error) {
    this.success = success;
    this.result = result;
    this.error = error;
  }
}

module.exports = ApiResponse;
