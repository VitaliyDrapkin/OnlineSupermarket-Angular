const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getAllCategories() {
  const sql = "SELECT * FROM categories ORDER BY `id`";
  try {
    const categories = await connection.execute(sql);

    return categories;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  getAllCategories,
};
