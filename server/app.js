const express = require("express");
const expressServer = express();
const http = require("http"); // More basic server than express.

const cors = require("cors");

const usersController = require("./controllers/users-controller");
const filesController = require("./controllers/files-controller");
const categoriesController = require("./controllers/categories-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const errorHandler = require("./errors/error-handler");
const loginFilter = require("./middleware/login-filter");
const scanUnauthorizedError = require("./middleware/scanUnauthorizedError");

expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

expressServer.use(cors({ origin: "http://localhost:4200", credentials: true }));

expressServer.use("/upload", express.static("./upload"));

expressServer.use(loginFilter());
expressServer.use(scanUnauthorizedError);
expressServer.use("/users", usersController);
expressServer.use("/categories", categoriesController);
expressServer.use("/products", productsController);
expressServer.use("/carts", cartsController);
expressServer.use("/files", filesController);

expressServer.use(errorHandler);

expressServer.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
