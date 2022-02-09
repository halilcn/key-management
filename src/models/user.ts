import { Schema, model } from 'mongoose';

import UserToken from "./schematics/user-token";

const User = new Schema({
        name: {
            type: String,
            required: true,
            maxlength: 20,
            trim: true
        },
        surname: {
            type: String,
            required: true,
            maxlength: 20,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        tokens: [UserToken]
    },
    {
        timestamps: true
    });

export default model('User', User);
