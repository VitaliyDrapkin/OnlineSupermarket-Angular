const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getProductsByCategory(categoryId) {
  const sql = "SELECT * FROM products WHERE categoryId = ?";
  const parameters = [categoryId];
  try {
    const products = await connection.executeWithParameters(sql, parameters);
    return products;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getProductByName(name) {
  const sql = "SELECT * FROM products WHERE name like ?;";
  const parameters = ["%" + name + "%"];
  try {
    const products = await connection.executeWithParameters(sql, parameters);
    return products;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function addProduct(name, categoryId, price, image) {
  const sql = "INSERT INTO products VALUES (null, ?, ?, ?, ?)";
  const parameters = [name, categoryId, price, image];
  try {
    const response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function editProduct(id, name, categoryId, price, image) {
  const sql =
    "UPDATE products SET name = ? ,categoryId = ? , price = ? , image = ? WHERE id = ?";
  const parameters = [name, categoryId, price, image, id];
  try {
    const test = await connection.executeWithParameters(sql, parameters);
    console.log(test);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}
async function editProductWithoutImage(id, name, categoryId, price) {
  const sql =
    "UPDATE products SET name = ? ,categoryId = ? , price = ?  WHERE id = ?";
  const parameters = [name, categoryId, price, id];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getProductImageURL(productId) {
  const sql = "SELECT image FROM products WHERE id = ?";
  const parameters = [productId];
  try {
    const imgData = await connection.executeWithParameters(sql, parameters);
     return imgData[0].image;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  getProductsByCategory,
  getProductByName,
  addProduct,
  editProduct,
  editProductWithoutImage,
  getProductImageURL,
};
