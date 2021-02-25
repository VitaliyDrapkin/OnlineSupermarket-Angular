const productsDao = require("../dao/products-dao");
const filesLogic = require("./files-logic");
const encryption = require("../helper/encryption");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getProducts(searchBy, value) {
  let products;
  if (searchBy == "category") {
    products = await productsDao.getProductsByCategory(value);
  }
  if (searchBy == "name") {
    products = await productsDao.getProductByName(value);
  }
  products = products.map((product) => {
    product.image = filesLogic.getImageUrlForClient(product.image);
    return product;
  });
  return { products };
}

async function addProduct(BearerToken, name, categoryId, price, image) {
  const responseData = encryption.bearerTokenToData(BearerToken);
  if (responseData.userType != "admin") {
    throw new ServerError(ErrorType.USER_NOT_ADMIN);
  }
  image = filesLogic.getImageUrlForDB(image);
  const productId = await productsDao.addProduct(
    name,
    categoryId,
    price,
    image
  );
  return { status: "Success", productId };
}

async function editProduct(BearerToken, id, name, categoryId, price, image) {
  const responseData = encryption.bearerTokenToData(BearerToken);
  if (responseData.userType != "admin") {
    throw new ServerError(ErrorType.USER_NOT_ADMIN);
  }
  if (image) {
    const oldImg = await productsDao.getProductImageURL(id);
    image = filesLogic.getImageUrlForDB(image);
    await productsDao.editProduct(id, name, categoryId, price, image);
    filesLogic.deleteFile(oldImg);
  } else {
    await productsDao.editProductWithoutImage(id, name, categoryId, price);
  }
  return { status: "Success" };
}

module.exports = {
  getProducts,
  addProduct,
  editProduct,
};
