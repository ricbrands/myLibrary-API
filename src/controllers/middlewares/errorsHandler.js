import mongoose from "mongoose";
import ErrorBase from "../../errors/ErrorBase.js";
import BadRequest from "../../errors/BadRequest.js";
import ValidationError from "../../errors/ValidationError.js";
import NotFound from "../../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
function errorsHandler(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new BadRequest().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if (err instanceof NotFound) {
    err.sendResponse(res);
  }else {
    new ErrorBase().sendResponse(res);
  }

}

export default errorsHandler;