import mongoose from "mongoose";
import logger from "./utils/logger";

require('dotenv').config()

mongoose.connect(process.env.MONGO_DB_URI as string)
    .then(() => {
        logger.info('Connected to mongoDB')
    })
    .catch(err => {
        logger.error('Mongoose connect error:' + err)
    })
