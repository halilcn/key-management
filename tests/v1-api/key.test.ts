import request from 'supertest';

import app from "../../src/app";
import createUser from '../../test-utils/create-user';
import Key from "../../src/models/key";

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
        const { token, _id } = await createUser();
        const key = {
            user: _id,
            key: 'test-key',
            name: 'test',
            expireDate: '2099/01/01',
        };

        const createdKey = await Key.create(key);

        await request(app)
            .get(`/api/v1/user/keys/${createdKey._id}`)
            .set('Authorization', token)
            .expect(200);
    });

    test('/:keyId (PUT)', async () => {
        const { token, _id } = await createUser();
        const key = {
            user: _id,
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

    test('/:keyId (DELETE)', async () => {
        const { token, _id } = await createUser();
        const key = {
            user: _id,
            key: 'test-key',
            name: 'test',
            expireDate: '2099/01/01'
        };

        const createdKey = await Key.create(key);

        await request(app)
            .delete(`/api/v1/user/keys/${createdKey._id}`)
            .set('Authorization', token)
            .expect(200);
    });

    test('/:keyId/refresh (DELETE)', async () => {
        const { token, _id } = await createUser();
        const key = {
            user: _id,
            key: 'test-key',
            name: 'test',
            expireDate: '2099/01/01'
        };

        const createdKey = await Key.create(key);

        await request(app)
            .post(`/api/v1/user/keys/${createdKey._id}/refresh`)
            .set('Authorization', token)
            .expect(200);
    });
});
