import {Schema, model} from 'mongoose';

const User = new Schema({
        name: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    });

export default model('User', User);
