import { Schema } from 'mongoose';

export default new Schema({
        token: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });
