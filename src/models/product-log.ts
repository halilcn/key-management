import { Schema, model } from 'mongoose';

const PRODUCT_TYPES = ['test'];

const ProductLog = new Schema({
        key: {
            type: Schema.Types.ObjectId,
            ref: 'Key'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        product: {
            type: String,
            required: true
        },
        method: {
            type: String,
            enum: PRODUCT_TYPES
        }
    },
    {
        timestamps: true
    });

export default model('ProductLog', ProductLog);
