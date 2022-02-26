import User from '../../src/models/user';
const mongoose = require('mongoose');


beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-key-manager');
});

describe('USER API', () => {
    test('GET', () => {

    });
});
