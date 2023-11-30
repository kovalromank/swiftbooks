const request = require('supertest');
const app = require('../src/app'); 
const booklistModel = require('../src/models/booklistModel');

// Mock the entire userModel module
jest.mock('../src/models/booklistModel');


describe('Open Book Endpoints', () => {

    // Test for book search with good spellings and complete data
    it('Should return json list of books', async () => {  

        // test
        const response = await request(app)
            .get('/api/open/search')
            .send({
                author: 'Suzanne Collins',
                field: 'Fiction',
                title: 'Hunger Games',
                offset: 0,
            });

        expect(response.statusCode).toBe(200);
    });

    // Test for book id
    it('Should return json object with book data', async () => {  

        // test valid id book lookup
        const response = await request(app)
            .get('/api/open/book-info-from-id')
            .send({
                id: 'Yz8Fnw0PlEQC'
            });

        expect(response.statusCode).toBe(200);
    });

    // Test for book invalid id
    it('Should return error code', async () => {  

        // test valid id book lookup
        const response = await request(app)
            .get('/api/open/book-info-from-id')
            .send({
                id: 'invalid_id'
            });

        expect(response.statusCode).toBe(500);
    });



    // Test for getting ten most recent public booklists
    it('should return the ten most recently modified public booklists', async () => {  

        const mockBooklists = [
            { id: 1, list_name: 'List 1', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 2, list_name: 'List 2', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 3, list_name: 'List 3', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 4, list_name: 'List 4', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 5, list_name: 'List 5', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 6, list_name: 'List 6', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 7, list_name: 'List 7', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 8, list_name: 'List 8', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 9, list_name: 'List 9', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
            { id: 10, list_name: 'List 10', is_public: true, created_by_id: 0, created_by_username: 'test_user'}, 
        ];
    
        // Mock ten_most_recent_public_lists
        booklistModel.ten_most_recent_public_lists.mockResolvedValue(mockBooklists);
        // test
        const response = await request(app)
            .get('/api/open/recent-public-booklists');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockBooklists);
        expect(response.body.length).toBe(10);
    });


});