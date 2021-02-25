const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("./config.json");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const bearerTokenToData = (bearerToken) => {
  const decodeData = decryptToken(bearerToken, "Bearer ");
  return decodeData.data;
};

function getToken(data, time = "2h") {
  const token = createToken(data, time, config.secretAccessToken);
  return token;
}

function createToken(data, time, secret) {
  const token = jwt.sign({ data }, secret, {
    expiresIn: time,
  });
  return "Bearer " + token;
}

function decryptToken(token, cutField) {
  try {
    if (cutField) {
      token = token.slice(cutField.length);
    }
    const decodeData = jwt.decode(token);
    if (!decodeData) {
      throw new ServerError(ErrorType.UNAUTHORIZED_TOKEN);
    }
    return decodeData;
  } catch (error) {
    throw new ServerError(ErrorType.UNAUTHORIZED_TOKEN);
  }
}

function hashingPassword(password) {
  const saltRight = "qwd#f2fn29asd";
  const saltLeft = "!9fwejf3on$#f3ws";
  const hashPassword = crypto
    .createHash("md5")
    .update(saltLeft + password + saltRight)
    .digest("hex");
  return hashPassword;
}

module.exports = {
  getToken,
  hashingPassword,
  bearerTokenToData,
};
