import request from 'supertest';
import faker from "@faker-js/faker";
import jwt from "jsonwebtoken";

import app from "../../src/app";
import User from '../../src/models/user';
import UserRegisterCode from "../../src/models/user-register-code";
import UserResetPassword from "../../src/models/user-reset-password";
import createUser from '../../test-utils/create-user';
import Key from "../../src/models/key";
import KeyPermission from "../../src/models/key-permission";

describe('KEY API', () => {
    test('/ (GET)', async () => {
        const { token } = await createUser();

        await request(app)
            .get('/api/v1/user/keys')
            .set('Authorization', token)
            .expect(200);

    });

    test('/ (POST)', async () => {
        const { token } = await createUser();
        const key = {
            name: 'test',
            expireDate: '2099/01/01'
        };

        await request(app)
            .post('/api/v1/user/keys')
            .set('Authorization', token)
            .send(key)
            .expect(201);
    });

    test('/:keyId (GET)', async () => {
        //todo:error
        const { token } = await createUser();
        const key = {
            key: 'test-key',
            name: 'test',
            expireDate: '2099/01/01'
        };

        const createdKey = await Key.create(key);

        await request(app)
            .get(`/api/v1/user/keys/${createdKey._id}`)
            .set('Authorization', token)
            .expect(200);
    });

    test('/:keyId (PUT)', async () => {
        //todo:error
        const { token } = await createUser();
        const key = {
            key: 'test-key',
            name: 'test',
            expireDate: '2099/01/01'
        };

        const createdKey = await Key.create(key);

        await request(app)
            .put(`/api/v1/user/keys/${createdKey._id}`)
            .set('Authorization', token)
            .send({})
            .expect(200);
    });
});
