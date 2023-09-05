import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
  constructor(err) {
    const errorMessage = Object.values(err.errors)
      .map(err => err.message)
      .join("; ");

    super(`Errors found: ${errorMessage}`);
  }
}

export default ValidationError;