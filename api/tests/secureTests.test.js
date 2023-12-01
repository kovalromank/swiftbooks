/**
 * These tests are designed to be run against a database with valid data.
 * To set up a valid data environment, run app.js with the following flags:
 * --reset-db --init-db --fill-tables. 
 * 
 * ###################################################################
 * ENSURE YOU DONT RUN THIS WITH PRODUCTION DB SINCE IT DELETES TABLES!
 * ###################################################################
 * 
 * This will reset the database, initialize it with the required schema, 
 * and fill the tables with necessary data for testing.
 */



const request = require('supertest');
const app = require('../src/app'); 
const userModel = require('../src/models/userModel');
const booklistModel = require('../src/models/booklistModel');



// Log in before running the tests
let token;
beforeAll(async () => {
    const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'user3@example.com',
            password: 'password'
        });

    token = loginResponse.body.token; // Store the token from the login response
});

/*
describe('Create Booklist', () => {

    //test successful booklist create
    it('create new booklist with description', async () => {  

        // test
        const response = await request(app)
            .post('/api/secure/create-booklist')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_name: 'My new list with description and is_public!',
                is_public: true,
                description: "MY NEW DESCRIPTION!"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual(expect.stringMatching(/created/i));
    });


    it('create new booklist without description and without is_public', async () => {  

        // test
        const response = await request(app)
            .post('/api/secure/create-booklist')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_name: 'My new list!',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual(expect.stringMatching(/created/i));
    });


    //test fail create missing list name
    it('fail to create booklist missing name', async () => {  

        // test
        const response = await request(app)
            .post('/api/secure/create-booklist')
            .set('Authorization', `Bearer ${token}`)
            .send({
                is_public: true
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/missing/i));
    });


});*/


/*
describe('Get User Booklists', () => {

    //test successful get
    it('gets user booklists', async () => {  

        // test
        const response = await request(app)
            .get('/api/secure/get-user-booklists')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

});*/


/*
describe('Delete a booklist', () => {

    //test successful booklist delete
    it('delete booklist a booklist successfully', async () => {  

        // test
        const response = await request(app)
            .delete('/api/secure/delete-user-booklist')
            .set('Authorization', `Bearer ${token}`)
            .send({
                list_id: 5
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual(expect.stringMatching(/deleted/i));
    });


    it('fail to delete missing list id', async () => {  

        // test
        const response = await request(app)
            .delete('/api/secure/delete-user-booklist')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/missing/i));
    });


});*/


/*
describe('Add book to booklist', () => {


    it('Successfully add existing book to list', async () => {  

        const response = await request(app)
            .post('/api/secure/add-book-to-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 3,
                book_id: 've0BAAAAQAAJ' //existing book in db but not in list
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual(expect.stringMatching(/added book/i));
    });


    it('Fail to add (already book in list)', async () => {  

        const response = await request(app)
            .post('/api/secure/add-book-to-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 3,
                book_id: 've0BAAAAQAAJ' //existing book in db but not in list
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/already exists/i));
    });


    it('Sucessfully add book to list (and also book to db since new book id)', async () => {  

        const response = await request(app)
            .post('/api/secure/add-book-to-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 3,
                book_id: 'XSY_AAAAYAAJ' //new book
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual(expect.stringMatching(/added book/i));
    });


    it('Fail to add (Try adding to list not owned by user)', async () => {  

        const response = await request(app)
            .post('/api/secure/add-book-to-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 4,
                book_id: 'XSY_AAAAYAAJ' 
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/does not own/i));
    });


    it('Fail to add (missing book_id)', async () => {  

        const response = await request(app)
            .post('/api/secure/add-book-to-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 4,
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/missing book id/i));
    });


    it('Fail to add (missing list_id)', async () => {  

        const response = await request(app)
            .post('/api/secure/add-book-to-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                book_id: 'doesntmatter',
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/missing list id/i));
    });


});*/

/*
describe('Delete book from booklist', () => {

    it('Fail due to missing list_id param', async () => {  

        const response = await request(app)
            .delete('/api/secure/delete-book-from-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                book_id: 've0BAAAAQAAJ'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/missing list/i));
    });

    it('Fail due to missing book_id param', async () => {  

        const response = await request(app)
            .delete('/api/secure/delete-book-from-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 3
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/missing book/i));
    });


    it('Fail due to not owning list', async () => {  

        const response = await request(app)
            .delete('/api/secure/delete-book-from-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 4,
                book_id: 've0BAAAAQAAJ'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/does not own/i));
    });


    it('Fail due to book id not being in the list', async () => {  

        const response = await request(app)
            .delete('/api/secure/delete-book-from-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 3,
                book_id: 'fakeid'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/not in list/i));
    });


    it('Succcessfully remove book', async () => {  

        const response = await request(app)
            .delete('/api/secure/delete-book-from-list')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                list_id: 3,
                book_id: 've0BAAAAQAAJ'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual(expect.stringMatching(/book removed/i));
    });

});*/


/*
describe('Get booklist books', () => {

    it('Fail due to missing list_id param', async () => {  

        const response = await request(app)
            .get('/api/secure/get-booklist-books')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/list id not/i));
    });


    it('Fail due to accessing private list user does not own', async () => {  

        const response = await request(app)
            .get('/api/secure/get-booklist-books')
            .set('Authorization', `Bearer ${token}`)
            .query({
                list_id: 5
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/private list that isnt owned by user/i));
    });

    it('Successfully get public list not owned by use', async () => {  

        const response = await request(app)
            .get('/api/secure/get-booklist-books')
            .set('Authorization', `Bearer ${token}`)
            .query({
                list_id: 4
            });

        expect(response.statusCode).toBe(200);
    });

    it('Successfully get private list owned by use', async () => {  

        const response = await request(app)
            .get('/api/secure/get-booklist-books')
            .set('Authorization', `Bearer ${token}`)
            .query({
                list_id: 1
            });

        expect(response.statusCode).toBe(200);
    });

});*/


/*
describe('Update booklist name', () => {

    it('Fail due to missing list_id param', async () => {  

        const response = await request(app)
            .put('/api/secure/update-booklist-name')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "NEW NAME!"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/list id not/i));
    });


    it('Fail due to missing name param', async () => {  

        const response = await request(app)
            .put('/api/secure/update-booklist-name')
            .set('Authorization', `Bearer ${token}`)
            .send({
                list_id: 3
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/name not/i));
    });


    it('Fail due to user not owning list', async () => {  

        const response = await request(app)
            .put('/api/secure/update-booklist-name')
            .set('Authorization', `Bearer ${token}`)
            .send({
                list_id: 4,
                name: "NEW NAME!"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual(expect.stringMatching(/user does not own/i));
    });


});*/