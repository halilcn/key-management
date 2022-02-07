import {Model} from 'mongoose';

export const unique = async (model: Model<any>, filters: object) => {
    const res = await model.findOne(filters);
    if (res !== null) throw new Error(`${Object.keys(filters).toString()} params must be unique.`);
};
