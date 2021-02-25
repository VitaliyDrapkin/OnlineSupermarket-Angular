const expressJwt = require("express-jwt");
const config = require("../helper/config.json");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
// Extracting the text from the secret's JSON
const secret = config.secretAccessToken;

function authenticateJwtRequestToken() {
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/users/registration",
      "/users/login",
      "/users/check",
      "/users/info",
    ],
  });
}

module.exports = authenticateJwtRequestToken;
