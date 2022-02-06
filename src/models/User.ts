import {Schema, model} from 'mongoose';

const User = new Schema({
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            index: {
                unique: true
            },
        },
        password: {}
    },
    {
        timestamps: true
    });

export default model('User', User);
