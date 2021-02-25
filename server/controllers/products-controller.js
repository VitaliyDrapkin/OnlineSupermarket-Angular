const express = require("express");
const productsLogic = require("../logic/products-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const responseData = await productsLogic.getProducts(
      request.query.search,
      request.query.value
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const responseData = await productsLogic.addProduct(
      request.headers.authorization,
      request.body.name,
      request.body.categoryId,
      request.body.price,
      request.body.image
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const responseData = await productsLogic.editProduct(
      request.headers.authorization,
      request.params.id,
      request.body.name,
      request.body.categoryId,
      request.body.price,
      request.body.image
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
