import mongoose from "mongoose";

require('dotenv').config()

try {
    /*{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }*/
    mongoose.connect(process.env.MONGO_DB_URI as string)
        .then(() => {
            console.log('mongo db bağladı');
        });
} catch (err) {
    console.warn('Mongoose error:' + err);
}
