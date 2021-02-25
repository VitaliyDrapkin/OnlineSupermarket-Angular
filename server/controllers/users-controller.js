const express = require("express");
const usersLogic = require("../logic/users-logic");

const router = express.Router();

router.post("/registration", async (request, response, next) => {
  try {
    const responseData = await usersLogic.register(
      request.body.id,
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      request.body.password,
      request.body.city,
      request.body.street
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (request, response, next) => {
  try {
    const responseData = await usersLogic.login(
      request.body.id,
      request.body.password
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.get("/login", async (request, response, next) => {
  try {
    const responseData = await usersLogic.loginByToken(
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.delete("/login", async (request, response, next) => {
  try {
    const responseData = await usersLogic.logout(request.headers.authorization);
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.post("/check", async (request, response, next) => {
  try {
    const responseData = await usersLogic.check(
      request.body.id,
      request.body.password,
      request.body.email
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.get("/info", async (request, response, next) => {
  try {
    const responseData = await usersLogic.getShopInfo();
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
