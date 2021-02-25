const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getLastCarts(userId) {
  const sql =
    "SELECT carts.id, carts.createDate, purchases.datePurchase, (SELECT SUM(totalPrice) as totalPrice FROM cartitems WHERE cartId = carts.id) as totalPrice FROM carts LEFT JOIN purchases ON   carts.id = purchases.cartId  WHERE carts.userId = ? ORDER BY id DESC LIMIT 2";
  try {
    const parameters = [userId];

    const data = await connection.executeWithParameters(sql, parameters);
    return data;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getProductsInCart(userId) {
  const sql =
    "SELECT cartitems.id, cartitems.amount, cartitems.totalPrice, products.name, products.image FROM cartitems JOIN products ON cartitems.productId = products.id && cartitems.cartId= (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1) ";
  try {
    const parameters = [userId];

    const data = await connection.executeWithParameters(sql, parameters);
    return data;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function addProduct(userId, productId, amount) {
  const sql =
    "INSERT INTO cartitems VALUES (null, ?, ? ,(SELECT price * ? FROM products WHERE id = ?), (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1))";
  try {
    const parameters = [productId, amount, amount, productId, userId];
    response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function deleteProduct(userId, cartItemId) {
  const sql =
    "DELETE FROM cartitems WHERE id = ? && cartId = ( SELECT * FROM (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1) AS X);";
  try {
    const parameters = [cartItemId, userId];
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function createNewCart(userId, date) {
  const sql = "INSERT INTO carts VALUES (null, ?, ?)";
  try {
    const parameters = [userId, date];
    response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function removeAllProducts(userId) {
  const sql =
    "DELETE FROM carts WHERE id =  ( SELECT * FROM (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1) AS X);    ";
  try {
    const parameters = [userId];
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function increaseAmountOfProduct(userId, cartItemId) {
  const sql =
    "UPDATE cartitems SET amount = amount+1, totalPrice = (totalPrice / (amount -1)) * amount WHERE id = ? AND cartId = (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1) ";
  try {
    const parameters = [cartItemId, userId];
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function decreaseAmountOfProduct(userId, cartItemId) {
  const sql =
    "UPDATE cartitems SET amount = amount-1, totalPrice = (totalPrice / (amount +1)) * amount WHERE id = ? AND cartId = (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1) AND amount > 1";
  try {
    const parameters = [cartItemId, userId];
    const response = await connection.executeWithParameters(sql, parameters);
    if (response.changedRows === 0) {
      await deleteProduct(userId, cartItemId);
    }
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function makePurchase(
  userId,
  city,
  street,
  dateDelivery,
  datePurchase,
  fourDigits
) {
  const sql =
    "INSERT INTO purchases VALUES (null, ? , (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1), (SELECT SUM(totalPrice) FROM cartitems WHERE cartId = (SELECT id FROM carts WHERE userId = ? ORDER BY id DESC LIMIT 1)), ? , ? , ?, ?, ?)";
  try {
    const parameters = [
      userId,
      userId,
      userId,
      city,
      street,
      dateDelivery,
      datePurchase,
      fourDigits,
    ];
    const response = await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  getLastCarts,
  addProduct,
  deleteProduct,
  createNewCart,
  removeAllProducts,
  increaseAmountOfProduct,
  decreaseAmountOfProduct,
  makePurchase,
  getProductsInCart,
};
