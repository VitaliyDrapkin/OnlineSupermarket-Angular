const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function register(
  id,
  firstName,
  lastName,
  email,
  password,
  city,
  street
) {
  const sql = "INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ? ,  'user')";
  try {
    const parameters = [id, firstName, lastName, email, password, city, street];

    await connection.executeWithParameters(sql, parameters);

    const responseData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      city: city,
      street: street,
      userType: "user",
    };

    return responseData;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function login(id, password) {
  const sql =
    "SELECT id, firstName, lastName, email, city, street, userType FROM users WHERE id = ? && password = ?";
  try {
    const parameters = [id, password];
    const responseData = await connection.executeWithParameters(
      sql,
      parameters
    );
    return responseData;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function isIdExist(id) {
  const sql = "SELECT id FROM users WHERE id = ?";
  try {
    const parameters = [id];
    const response = await connection.executeWithParameters(sql, parameters);
    return response;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function isEmailExist(email) {
  const sql = "SELECT email FROM users WHERE email = ?";
  try {
    const parameters = [email];
    const response = await connection.executeWithParameters(sql, parameters);
    return response;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getShopInfo() {
  const sql =
    "SELECT ( SELECT COUNT(*) FROM products) AS productsAmount, ( SELECT COUNT(*) FROM purchases) AS ordersSubmitted FROM dual";
  try {
    const response = await connection.execute(sql);
    return response;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  register,
  login,
  isIdExist,
  isEmailExist,
  getShopInfo,
};
