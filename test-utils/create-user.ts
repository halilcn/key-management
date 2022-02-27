import faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";

import User from "../src/models/user";

interface ICreateUser {
    _id: Schema.Types.ObjectId,
    email: string,
    token: string
}

export default async (): Promise<ICreateUser> => {
    const user = {
        name: 'name',
        surname: 'surname',
        email: faker.internet.email(),
        password: 'password'
    };
    const testToken = {
        name: 'test',
        token: ''
    };

    const createdUser = await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
    });

    testToken.token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN as string, {});

    await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [testToken] });

    return {
        _id: createdUser._id,
        email: user.email,
        token: testToken.token
    };
}
