import { Schema, model } from 'mongoose';

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
        tokens: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserToken'
            }
        ]
    },
    {
        timestamps: true
    });

export default model('User', User);
