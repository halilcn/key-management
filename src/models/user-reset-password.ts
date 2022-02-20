import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const UserResetPassword = new Schema({
    email: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        required: true,
        default: dayjs().add(2, 'hours')
    }
}, {
    timestamps: true
});

export default model('UserResetPassword', UserResetPassword, 'user-reset-password');
