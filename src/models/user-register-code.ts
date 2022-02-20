import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const UserRegisterCode = new Schema({
        email: {
            type: String,
            required: true
        },
        code: {
            type: Number,
            required: true,
            length: 6
        },
        expireDate: {
            type: Date,
            required: true,
            default: dayjs().add(2, 'hours')
        }
    },
    {
        timestamps: true
    });

export default model('UserRegisterCode', UserRegisterCode, 'user-register-codes');
