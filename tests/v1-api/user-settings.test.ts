import request from "supertest";
import faker from "@faker-js/faker";

import app from "../../src/app";
import createUser from '../../test-utils/create-user';
import UserResetEmailCode from "../../src/models/user-reset-email-code";

describe('USER SETTINGS API', () => {
    test('/ (GET)', async () => {
        const { token } = await createUser();

        await request(app)
            .get('/api/v1/user-settings')
            .set('Authorization', token)
            .expect(200);
    });

    test('/ (PUT)', async () => {
        const { token } = await createUser();

        await request(app)
            .put('/api/v1/user-settings')
            .send({})
            .set('Authorization', token)
            .expect(200);
    });

    test('/reset-email/code (POST)', async () => {
        const { token } = await createUser();

        await request(app)
            .post('/api/v1/user-settings/reset-email/code')
            .send({ email: faker.internet.email() })
            .set('Authorization', token)
            .expect(201);
    });

    test('/reset-email (POST)', async () => {
        const { _id, token, email } = await createUser();
        const code = 123456;

        await UserResetEmailCode.create({ email, code, user: _id });

        await request(app)
            .post('/api/v1/user-settings/reset-email')
            .send({ email, code })
            .set('Authorization', token)
            .expect(200);
    });
});
