import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const UserResetEmailCode = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
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

export default model('UserResetEmailCode', UserResetEmailCode, 'user-reset-email-codes');
