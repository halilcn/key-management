import { Express } from "express";

import userActions from "./v1/user-actions";
import key from "./v1/key";
import products from "./v1/products";
import auth from "../middlewares/auth";

module.exports = (app: Express) => {
    const v1 = '/api/v1';

    //todo: product ulaşınca key sorgusu ? Keyde izin olup olmadığı ?
    //todo: product api'lere ulaştıkça log ekleme ? frontend tarafında grafik şeklinde gösterebilsin
    //todo: product ürünleri token izinlerine göre sunma ? Örn: aaaaa token sadece weather api kullanabilir.
    //todo: her key oluşturulurken ürün belirleme, bu ürünlerin get post update delete permission koyma ?

    // API v1 routes
    app.use(`${v1}/user-actions`, userActions);
    app.use(`${v1}/user/keys`, auth, key);
    app.use(`${v1}/products`, auth, products);
};
