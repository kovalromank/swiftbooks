const request = require('supertest');
const app = require('../src/app'); 
const userModel = require('../src/models/userModel');
const bcrypt = require('bcrypt');


// Mock the entire userModel module
jest.mock('../src/models/userModel');
userModel.getUserIdFromToken = jest.fn((token) => jest.requireActual('../src/models/userModel').getUserIdFromToken(token));



describe('User Authentication', () => {

    // Test for successful login
    it('should login successfully and return a token', async () => {  

        // Mock finduserbyemail
        userModel.findUserByEmail.mockResolvedValue({ 
            id: 1,
            email: 'validuser@example.com',
            password: await bcrypt.hash("validpassword", 10)
        });

        // test
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'validuser@example.com',
                password: 'validpassword'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    // Test for login with invalid credentials
    it('should not login with invalid credentials', async () => {

        // Mock finduserbyemail
        userModel.findUserByEmail.mockResolvedValue({ 
            id: 1,
            email: 'validuser@example.com',
            password: await bcrypt.hash("validpassword", 10)
        });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invaliduser@example.com',
                password: 'wrongpassword'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.token).toBeUndefined();
    });

    // test register
    // Test for successful registration
    it('should register a user successfully', async () => {

        // Mock createUser function from userModel
        userModel.createUser.mockResolvedValue({
            email: 'newuser@example.com',
            username: 'newuser',
            password: 'newpassword'
        });

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'newuser',
                email: 'newuser@example.com',
                password: 'newpassword'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    // Test for registration with existing email
    it('should not register with an existing email', async () => {

        // Mock findUserByEmail to simulate existing user
        userModel.findUserByEmail.mockResolvedValue({
            id: 1,
            email: 'existinguser@example.com',
        });

        // Mock createUser to simulate registration failure
        userModel.createUser.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'existinguser',
                email: 'existinguser@example.com',
                password: 'password'
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.token).toBeUndefined();
    });


    // Test for successful login + getting current user id from active jwt token
    it('should login successfully and return a token which should be decoded to user id', async () => {  

        // Mock finduserbyemail
        userModel.findUserByEmail.mockResolvedValue({ 
            id: 42,
            email: 'validuser@example.com',
            password: await bcrypt.hash("validpassword", 10)
        });

        // test
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'validuser@example.com',
                password: 'validpassword'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(userModel.getUserIdFromToken(response.body.token)).toBe(42)
    });


});
