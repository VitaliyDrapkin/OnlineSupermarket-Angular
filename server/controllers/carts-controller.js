const express = require("express");
const cartsLogic = require("../logic/carts-logic");

const router = express.Router();

router.get("/info", async (request, response, next) => {
  try {
    const responseData = await cartsLogic.getLastCartActionsInfo(
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const responseData = await cartsLogic.getProductsInCart(
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

// router.post("/", async (request, response, next) => {
//   try {
//     const responseData = await cartsLogic.createNewCart(
//       request.headers.authorization
//     );
//     response.send(responseData);
//   } catch (error) {
//     return next(error);
//   }
// });

router.delete("/", async (request, response, next) => {
  try {
    const responseData = await cartsLogic.removeAllProducts(
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.post("/cartitem", async (request, response, next) => {
  try {
    const responseData = await cartsLogic.addProduct(
      request.headers.authorization,
      request.body.productId,
      request.body.amount
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.put("/cartitem/:id", async (request, response, next) => {
  try {
    const responseData = await cartsLogic.changeAmount(
      request.headers.authorization,
      request.params.id,
      request.body.changeType
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.delete("/cartitem/:id", async (request, response, next) => {
  try {
    const responseData = await cartsLogic.deleteProduct(
      request.headers.authorization,
      request.params.id
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.post("/purchase", async (request, response, next) => {
  try {
    const responseData = await cartsLogic.makePurchase(
      request.headers.authorization,
      request.body.city,
      request.body.street,
      request.body.dateDelivery,
      request.body.fourDigits
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
