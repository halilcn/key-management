import { Schema, model } from 'mongoose';

const Key = new Schema(
    {
        key: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        expireDate: {
            type: Date,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    });

export default model('Key', Key);
