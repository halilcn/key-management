import { Schema, model } from 'mongoose';

//todo: permissions ?

const key = new Schema(
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

export default model('Key', key);
