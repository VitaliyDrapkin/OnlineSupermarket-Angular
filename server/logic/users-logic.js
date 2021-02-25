const usersDao = require("../dao/users-dao");
const encryption = require("../helper/encryption");
const validators = require("../helper/validators");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function check(id, password, email) {
  const response = {
    isGood: true,
    id: { isGood: true, errorType: "" },
    email: { isGood: true, errorType: "" },
    password: { isGood: true, errorType: "" },
  };
  const validateIdError = await validators.IdCheck(id);
  const validatePasswordError = await validators.passwordCheck(password);
  const validateEmailError = await validators.emailCheck(email);

  if (validateIdError) {
    response.isGood = false;
    response.id.isGood = false;
    response.id.message = validateIdError;
  }
  if (validatePasswordError) {
    response.isGood = false;
    response.password.isGood = false;
    response.password.message = validatePasswordError;
  }
  if (validateEmailError) {
    response.isGood = false;
    response.email.isGood = false;
    response.email.message = validateEmailError;
  }

  return response;
}

async function register(
  id,
  firstName,
  lastName,
  email,
  password,
  city,
  street
) {
  const validateIdError = await validators.IdCheck(id);
  const validatePasswordError = await validators.passwordCheck(password);
  const validateEmailError = await validators.emailCheck(email);
  const validateNameError = await validators.validateName(firstName);
  const validateLastNameError = await validators.validateName(lastName);
  const validateCity = await validators.validateCity(city);
  const validateStreet = await validators.validateStreet(street);

  //If user try to manipulate with client code validation
  if (
    validateIdError ||
    validatePasswordError ||
    validateEmailError ||
    validateNameError ||
    validateLastNameError ||
    validateCity ||
    validateStreet
  ) {
    throw new ServerError(ErrorType.SERVER_VALIDATION_ERROR);
  }

  const hashPassword = encryption.hashingPassword(password);
  const responseData = await usersDao.register(
    id,
    firstName,
    lastName,
    email,
    hashPassword,
    city,
    street
  );
  const token = encryption.getToken(responseData);
  return { userData: responseData, token };
}

async function login(id, password) {
  const hashPassword = encryption.hashingPassword(password);
  const responseData = await usersDao.login(id, hashPassword);

  if (responseData.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  const token = encryption.getToken(responseData[0]);
  return { userData: responseData[0], token };
}

async function loginByToken(BearerToken) {
  const responseData = encryption.bearerTokenToData(BearerToken);
  return { userData: responseData };
}

async function getShopInfo() {
  const shopInfo = await usersDao.getShopInfo();
  return { shopInfo: shopInfo[0] };
}

module.exports = {
  register,
  login,
  loginByToken,
  check,
  getShopInfo,
};
