const request = require('supertest');
const app = require('../src/app'); 
const userModel = require('../src/models/userModel');
const booklistModel = require('../src/models/booklistModel');

jest.mock('../src/models/userModel');
jest.mock('../src/models/booklistModel');
jest.mock('../src/middleware/authMiddleware', () => ({
    verifyToken: (req, res, next) => next(), // Bypass the actual token verifying implementation
}));


describe('create_booklist', () => {
    it('should create a booklist when the number of lists is less than 20', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.num_booklists_by_user.mockResolvedValue(10); // Mocking to return 10 lists
        userModel.getUsernameFromId.mockResolvedValue("test_user"); // Mocking booklist creation

        const response = await request(app)
            .post('/api/secure/create-booklist') 
            .send({ list_name: 'New List', is_public: false });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({'message': 'Booklist created.'});
    });

    it('should not create a booklist when the number of lists is 20 or more', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1);
        booklistModel.num_booklists_by_user.mockResolvedValue(20); // Now returning 20 lists

        const response = await request(app)
            .post('/api/secure/create-booklist') 
            .send({ list_name: 'New List', is_public: false });

        expect(response.statusCode).toBe(403);
        expect(response.body).toEqual({'message': 'Too many lists already. Maximum number of lists already exist.'});
    });

});



describe('get_user_booklists', () => {
    it('should return list of booklists belonging to user', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval

        const response = await request(app)
            .post('/api/secure/get-user-booklists');

        expect(response.statusCode).toBe(200);
    });

});



describe('delete_user_booklist', () => {
    it('should delete a list that belongs to usr', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval

        const response = await request(app)
            .post('/api/secure/delete-user-booklist');

        expect(response.statusCode).toBe(200);
    });

});


describe('add_book_to_booklist', () => {
    it('should add book to list belonging to user', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.does_user_own_list.mockResolvedValue(true); // Mock user owns list
        booklistModel.does_book_exist.mockResolvedValue(false); // Mock book doesnt exist in db yet

        const response = await request(app)
            .post('/api/secure/add-book-to-list') 
            .send({ list_id: 1, book_object: {id: 'testid'} });

        expect(response.statusCode).toBe(200);
    });

    it('should not add book since list does not belong to user', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.does_user_own_list.mockResolvedValue(false); // Mock user does not owns list
        booklistModel.does_book_exist.mockResolvedValue(false); // Mock book doesnt exist in db yet

        const response = await request(app)
            .post('/api/secure/add-book-to-list') 
            .send({ list_id: 1, book_object: {id: 'testid'} });

        expect(response.statusCode).toBe(401);
    });

});


describe('delete_book_from_booklist', () => {
    it('should delete book from booklist belonging to user', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.does_user_own_list.mockResolvedValue(true); // Mock user owns list
        booklistModel.does_book_exist.mockResolvedValue(false); // Mock book doesnt exist in db yet

        const response = await request(app)
            .post('/api/secure/delete-book-from-list') 
            .send({ list_id: 1, book_object: {id: 'testid'} });

        expect(response.statusCode).toBe(200);
    });

    it('should not delete book from booklist not belonging to user', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.does_user_own_list.mockResolvedValue(false); // Mock user owns list
        booklistModel.does_book_exist.mockResolvedValue(false); // Mock book doesnt exist in db yet

        const response = await request(app)
            .post('/api/secure/delete-book-from-list') 
            .send({ list_id: 1, book_object: {id: 'testid'} });

        expect(response.statusCode).toBe(401);
    });

});



describe('get_book_info_from_list', () => {
    it('fetch book details from list that is public', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.does_user_own_list.mockResolvedValue(false); // Mock user does not own list
        booklistModel.is_list_public.mockResolvedValue(true); // Mock list is public

        const response = await request(app)
            .post('/api/secure/get-booklist-books') 
            .send({ list_id: 1});

        expect(response.statusCode).toBe(200);
    });

    it('fetch book details from list that is private but belong to user', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.does_user_own_list.mockResolvedValue(true); // Mock user owns list
        booklistModel.is_list_public.mockResolvedValue(false); // Mock list is private

        const response = await request(app)
            .post('/api/secure/get-booklist-books') 
            .send({ list_id: 1 });

        expect(response.statusCode).toBe(200);
    });

    it('try to fetch details from list that is private and does not belong to user', async () => {
        userModel.getUserIdFromToken.mockReturnValue(1); // Mocking user ID retrieval
        booklistModel.does_user_own_list.mockResolvedValue(false); // Mock user doesnt owns list
        booklistModel.is_list_public.mockResolvedValue(false); // Mock list is private

        const response = await request(app)
            .post('/api/secure/get-booklist-books') 
            .send({ list_id: 1 });

        expect(response.statusCode).toBe(401);
    });

});