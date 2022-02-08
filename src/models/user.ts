import { Schema, model } from 'mongoose';
import UserToken from "./shared/user-token";

const User = new Schema({
        name: {
            type: String,
            required: true,
            maxlength: 20
        },
        surname: {
            type: String,
            required: true,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
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
