import request from 'supertest';
import faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import app from "../../src/app";
import User from '../../src/models/user';
import UserRegisterCode from "../../src/models/user-register-code";
import UserResetPassword from "../../src/models/user-reset-password";

describe('USER ACTIONS API', () => {

    test('/register/code', async () => {
        await request(app)
            .post('/api/v1/user-actions/register/code')
            .send({ email: faker.internet.email() })
            .expect(201);
    });

    test('/register', async () => {
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

    test('/login', async () => {
        const user = {
            name: 'name',
            surname: 'surname',
            email: faker.internet.email(),
            password: 'password'
        };

        await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });

        await request(app)
            .post('/api/v1/user-actions/login')
            .send(user)
            .expect(200);
    });

    test('/reset-password', async () => {
        const user = {
            name: 'name',
            surname: 'surname',
            email: faker.internet.email(),
            password: 'password'
        };

        await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });

        await request(app)
            .post('/api/v1/user-actions/reset-password')
            .send({ email: user.email })
            .expect(201);
    });

    test('/reset-password/:key', async () => {
        const user = {
            name: 'name',
            surname: 'surname',
            email: faker.internet.email(),
            password: 'password'
        };
        const resetPasswordUser = {
            email: user.email,
            key: 123456
        };

        await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
        await UserResetPassword.create(resetPasswordUser);

        await request(app)
            .post(`/api/v1/user-actions/reset-password/${resetPasswordUser.key}`)
            .send({ email: user.email, password: 'newPassword' })
            .expect(200);
    });

    test('/logout', async () => {
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

        await request(app)
            .post('/api/v1/user-actions/logout')
            .set('Authorization', testToken.token)
            .expect(200);
    });
});
