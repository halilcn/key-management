import mongoose from "mongoose";
import request from 'supertest';
//import * as faker from 'faker';

import app from "../../src/app";
import User from '../../src/models/user';
import UserRegisterCode from "../../src/models/user-register-code";


beforeEach(async () => {
    //todo:!
    await mongoose.connect('mongodb://localhost:27017/key-manager');
});

describe('USER ACTIONS API', () => {

    test('/register/code', async () => {
        await request(app)
            .post('/api/v1/user-actions/register/code')
            .send({ email: 'test@gmail.com' })
            .expect(201);
    });

    test('/register', async () => {
        const user = {
            name: 'name',
            surname: 'surname',
            email: 'test@gmai.com',
            code: 123456,
            password: 'password'
        };

        await UserRegisterCode.create({ email: user.email, code: user.code });

        await request(app)
            .post('/api/v1/user-actions/register')
            .send(user)
            .expect(201);
    });
});
