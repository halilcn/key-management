import { Schema, model } from 'mongoose';

const UserToken = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

export default model('UserToken', UserToken);
