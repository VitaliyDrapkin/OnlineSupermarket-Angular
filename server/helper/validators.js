const usersDao = require("../dao/users-dao");

const required = (value) => {
  if (!value) return "Field is required";
};

const requiredTrim = (value) => {
  if (value.trim() === "") return "Field is required";
};

const isNumber = (value) => {
  if (!Number.isInteger(value)) return "Field must be a number";
};

function isEmailCorrect(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return "Email is incorrect";
  }
}

const noSpacesStartEnd = (value) => {
  if (value.trim() && value.length > value.trim().length) {
    return "Field cant start or end with space";
  }
};

const spaceBetween = (value) => {
  value = value.trim();
  if (value && value.replace(" ", "").length !== value.length) {
    return "No space can be used inside this field";
  }
};

const lettersAndNumbers = (value) => {
  if (!value.trim().match("^[A-Za-z0-9_*.!, ]*$")) {
    return "Use only english letters, numbers or '_' ',' '.' symbols";
  }
};

const maxNumberOfDigits = (maxDigits) => (value) => {
  if (value.toString().length > maxDigits) {
    return `Max number of digits is ${maxDigits} symbols`;
  } else return;
};

const minNumberOfDigits = (minDigits) => (value) => {
  if (value.toString().length < minDigits) {
    return `Min number of digits is ${minDigits} symbols`;
  }
};

const maxLengthValidatorCreator = (maxLength) => (value) => {
  if (value.trim().length > maxLength) {
    return `Max length is ${maxLength} symbols`;
  } else return;
};

const minLengthValidatorCreator = (minLength) => (value) => {
  if (value && value.trim().length < minLength) {
    return `Min length is ${minLength} symbols`;
  }
};

//special validators
const isIdExist = async (id) => {
  const response = await usersDao.isIdExist(id);
  if (response.length > 0) {
    return "Id is already in use";
  }
};

const isEmailExist = async (email) => {
  const response = await usersDao.isEmailExist(email);
  if (response.length > 0) {
    return "Email is already in use";
  }
};

const validationCreator = (arrayFun) => (value, secondValue) => {
  for (const item of arrayFun) {
    if (item(value, secondValue)) {
      return item(value, secondValue);
    }
  }
};

const validateId = validationCreator([
  required,
  isNumber,
  maxNumberOfDigits(9),
  minNumberOfDigits(9),
]);

const validatePassword = validationCreator([
  required,
  requiredTrim,
  noSpacesStartEnd,
  minLengthValidatorCreator(6),
  maxLengthValidatorCreator(15),
]);

const validateEmail = validationCreator([
  required,
  requiredTrim,
  isEmailCorrect,
  minLengthValidatorCreator(4),
]);

const validateName = validationCreator([
  required,
  requiredTrim,
  maxLengthValidatorCreator(25),
]);

const validateCity = validationCreator([required, requiredTrim]);

const validateStreet = validationCreator([
  required,
  requiredTrim,
  maxLengthValidatorCreator(30),
]);

const IdCheck = (id) => {
  let errors = validateId(id);
  if (!errors) {
    errors = isIdExist(id);
  }
  return errors;
};

const passwordCheck = (password) => {
  const errors = validatePassword(password);
  return errors;
};

const emailCheck = (email) => {
  let errors = validateEmail(email);
  if (!errors) {
    errors = isEmailExist(email);
  }
  return errors;
};

module.exports = {
  IdCheck,
  passwordCheck,
  emailCheck,
  validateName,
  validateCity,
  validateStreet,
};
