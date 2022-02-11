import { Schema, model } from 'mongoose';
import constants from "../constants";

const KeyPermission = new Schema(
    {
        key: {
            type: Schema.Types.ObjectId,
            ref: 'Key'
        },
        product: {
            type: String,
            required: true,
            //todo:enum
        },
        methods: {
            type: [String],
            required: true,
            default: Object.values(constants.METHOD_PERMISSIONS),
            enum: Object.values(constants.METHOD_PERMISSIONS),
        }
    },
    {
        timestamps: true
    });

export default model('KeyPermission', KeyPermission, 'key-permissions');
