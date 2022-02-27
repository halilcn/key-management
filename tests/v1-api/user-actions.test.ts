import request from 'supertest';
import faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import app from "../../src/app";
import User from '../../src/models/user';
import UserRegisterCode from "../../src/models/user-register-code";
import UserResetPassword from "../../src/models/user-reset-password";
import createUser from '../../test-utils/create-user';

describe('USER ACTIONS API', () => {
    test('/register/code (POST)', async () => {
        await request(app)
            .post('/api/v1/user-actions/register/code')
            .send({ email: faker.internet.email() })
            .expect(201);
    });

    test('/register (POST)', async () => {
        const user = {
            name: 'name',
            surname: 'surname',
            email: faker.internet.email(),
            code: 123456,
            password: 'password'
        };

        await UserRegisterCode.create({ email: user.email, code: user.code });

        await request(app)
            .post('/api/v1/user-actions/register')
            .send(user)
            .expect(201);
    });

    test('/login (POST)', async () => {
        const { email, password } = await createUser();

        await request(app)
            .post('/api/v1/user-actions/login')
            .send({ email, password })
            .expect(200);
    });

    test('/reset-password (POST)', async () => {
        const { email } = await createUser();

        await request(app)
            .post('/api/v1/user-actions/reset-password')
            .send({ email })
            .expect(201);
    });

    test('/reset-password/:key (POST)', async () => {
        const { email } = await createUser();
        const resetPasswordUser = {
            email,
            key: 123456
        };

        await UserResetPassword.create(resetPasswordUser);

        await request(app)
            .post(`/api/v1/user-actions/reset-password/${resetPasswordUser.key}`)
            .send({ email, password: 'newPassword' })
            .expect(200);
    });

    test('/logout (POST)', async () => {
        const { _id } = await createUser();
        const testToken = {
            name: 'test',
            token: ''
        };

        testToken.token = jwt.sign({ user_id: _id }, process.env.JWT_TOKEN as string, {});

        await User.findOneAndUpdate({ _id }, { tokens: [testToken] });

        await request(app)
            .post('/api/v1/user-actions/logout')
            .set('Authorization', testToken.token)
            .expect(200);
    });
});
