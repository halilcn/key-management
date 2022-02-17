import { Schema, model } from 'mongoose';
import constants from "../constants";

const ProductLog = new Schema({
        key: {
            type: String,
            required: true
        },
        product: {
            type: String,
            required: true,
            enum: Object.values(constants.PRODUCT_SLUGS)
        },
        method: {
            type: String,
            required: true,
            enum: Object.values(constants.METHOD_PERMISSIONS)
        },
        ip: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

export default model('ProductLog', ProductLog,'product-log');
