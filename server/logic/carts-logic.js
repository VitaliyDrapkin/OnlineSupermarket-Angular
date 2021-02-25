const cartsDao = require("../dao/carts-dao");
const encryption = require("../helper/encryption");
const validators = require("../helper/validators");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const filesLogic = require("./files-logic");

async function getLastCartActionsInfo(BearerToken) {
  const data = encryption.bearerTokenToData(BearerToken);
  const lastCarts = await cartsDao.getLastCarts(data.id);
  const lastCartInfo = getLastCartInfo(lastCarts);
  const lastPurchaseInfo = getLastPurchaseInfo(lastCarts);
  return { lastCartInfo, lastPurchaseInfo };
}

async function getProductsInCart(BearerToken) {
  const lastCartsInfo = await getLastCartActionsInfo(BearerToken);
  if (!lastCartsInfo.lastCartInfo.isExist) {
    return { productsInCart: [] };
  }
  const data = encryption.bearerTokenToData(BearerToken);
  let productsInCart = await cartsDao.getProductsInCart(data.id);
  productsInCart = productsInCart.map((product) => {
    product.image = filesLogic.getImageUrlForClient(product.image);
    return product;
  });
  return { productsInCart };
}

async function addProduct(BearerToken, productId, amount) {
  const data = encryption.bearerTokenToData(BearerToken);
  const lastCarts = await cartsDao.getLastCarts(data.id);
  const lastCartInfo = getLastCartInfo(lastCarts);
  if (!lastCartInfo.isExist) {
    cartsDao.createNewCart(data.id, new Date());
  }
  const cartItemId = await cartsDao.addProduct(data.id, productId, amount);
  return { cartItemId };
}

async function deleteProduct(BearerToken, cartItemId) {
  const data = encryption.bearerTokenToData(BearerToken);
  await cartsDao.deleteProduct(data.id, cartItemId);
  return { status: "Success" };
}

async function changeAmount(BearerToken, cartItemId, changeType) {
  const data = encryption.bearerTokenToData(BearerToken);
  if (changeType === "increase") {
    await cartsDao.increaseAmountOfProduct(data.id, cartItemId);
  }
  if (changeType === "decrease") {
    await cartsDao.decreaseAmountOfProduct(data.id, cartItemId);
  }
  return { status: "Success" };
}

async function createNewCart(BearerToken) {
  const data = encryption.bearerTokenToData(BearerToken);
  const cartId = await cartsDao.createNewCart(data.id, new Date());
  return { cartId };
}

async function removeAllProducts(BearerToken) {
  const data = encryption.bearerTokenToData(BearerToken);
  await cartsDao.removeAllProducts(data.id, new Date());
  return { status: "Success" };
}

async function makePurchase(
  BearerToken,
  city,
  street,
  dateDelivery,
  fourDigits
) {
  const data = encryption.bearerTokenToData(BearerToken);
  await cartsDao.makePurchase(
    data.id,
    city,
    street,
    dateDelivery,
    new Date(),
    fourDigits
  );
  return { status: "Success" };
}

//Helper functions
function getLastCartInfo(lastCarts) {
  let isExist = false;
  let isFill = false;
  let id = 0;
  let createDate = null;
  let totalPrice = 0;
  if (lastCarts.length > 0 && !lastCarts[0].datePurchase) {
    isExist = true;
    id = lastCarts[0].id;
    createDate = lastCarts[0].createDate;
    if (lastCarts[0].totalPrice) {
      isFill = true;
      totalPrice = lastCarts[0].totalPrice;
    }
  }
  return { isExist, id, isFill, totalPrice, createDate };
}

function getLastPurchaseInfo(lastCarts) {
  let isExist = false;
  let datePurchase = null;
  let totalPrice = 0;
  if (lastCarts.length == 2) {
    isExist = true;
    if (lastCarts[0].datePurchase) {
      datePurchase = lastCarts[0].datePurchase;
      totalPrice = lastCarts[0].totalPrice;
    } else {
      datePurchase = lastCarts[1].datePurchase;
      totalPrice = lastCarts[1].totalPrice;
    }
  }

  if (lastCarts.length == 1 && lastCarts[0].datePurchase) {
    isExist = true;
    datePurchase = lastCarts[0].datePurchase;
    totalPrice = lastCarts[0].totalPrice;
  }
  return { isExist, datePurchase, totalPrice };
}

module.exports = {
  getLastCartActionsInfo,
  addProduct,
  deleteProduct,
  createNewCart,
  removeAllProducts,
  changeAmount,
  makePurchase,
  getProductsInCart,
};
