const express = require("express");
const categoriesLogic = require("../logic/categories-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const categories = await categoriesLogic.getAllCategories();
    response.send(categories);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
