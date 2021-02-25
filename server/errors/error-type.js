const ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "A big fuck up which we'll never tell you of had just happened. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true,
  },
  UNAUTHORIZED: {
    id: 2,
    httpCode: 401,
    message: "Invalid ID or password",
    isShowStackTrace: false,
  },
  UNAUTHORIZED_TOKEN: {
    id: 3,
    httpCode: 401,
    message: "Incorrect_token",
    isShowStackTrace: false,
  },
  SERVER_VALIDATION_ERROR: {
    id: 4,
    httpCode: 666,
    message: "Validation Failed",
    isShowStackTrace: false,
  },
  USER_NOT_ADMIN: {
    id: 5,
    httpCode: 999,
    message: "User not admin",
    isShowStackTrace: true,
  },
};

module.exports = ErrorType;
