import { Express } from "express";

import userActions from "./v1/user-actions";
import key from "./v1/key";
import products from "./v1/products";
import productLogs from "./v1/product-logs";
import auth from "../middlewares/auth";
import productPermission from "../middlewares/product-permission";
import productUserPermission from "../middlewares/product-user-permission";

module.exports = (app: Express) => {
    const v1 = '/api/v1';

    //todo: log için route oluşturma. ge

    // API v1 routes
    app.use(`${v1}/user-actions`, userActions);
    app.use(`${v1}/user/keys`, auth, key);
    app.use(`${v1}/products`, productPermission, products);
    app.use(`${v1}/product-logs`, auth, productUserPermission, productLogs);
};
