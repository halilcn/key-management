import mongoose from "mongoose";
import request from 'supertest';
import faker from "@faker-js/faker";

import app from "../../src/app";
import User from '../../src/models/user';
import UserRegisterCode from "../../src/models/user-register-code";


beforeEach(async () => {
    //todo:app içinde mongofb bağlantısı zaten yapıyor ?
    await mongoose.connect('mongodb://localhost:27017/key-manager');
});

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

        //todo: bunun yerine api kullanmak ? çünkü password gibi şeylerde bcrypt yapmak gerekiyor.
        await User.create(user);

        await request(app)
            .post('/api/v1/user-actions/login')
            .send(user)
            .expect(200);
    });


});
