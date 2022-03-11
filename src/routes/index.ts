import { Express } from "express";

import userActions from "./v1/user-actions";
import version from "./v1/version";
import key from "./v1/key";
import userSettings from "./v1/user-settings";
import products from "./v1/products";
import productLogs from "./v1/product-logs";
import auth from "../middlewares/auth";
import productPermission from "../middlewares/product-permission";
import productUserPermission from "../middlewares/product-user-permission";

module.exports = (app: Express) => {
    const v1 = '/api/v1';

    app.use('/api/version', version);

    // API v1 routes
    app.use(`${v1}/user-actions`, userActions);
    app.use(`${v1}/user/keys`, auth, key);
    app.use(`${v1}/user-settings`, auth, userSettings);
    app.use(`${v1}/products`, productPermission, products);
    app.use(`${v1}/product-logs`, auth, productUserPermission, productLogs);
};
