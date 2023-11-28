const axios = require('axios');
const booklistModel = require('../models/booklistModel');


//Search books by title, auth, and genre
exports.search = async (req, res) => {
    //offset expects 0 / null, or number of times user presses load more
    try {
        const { author, field, title, offset } = req.body; //i am assuming field means genre of book

        let query = '';
        if (title) query += `${title}`;
        if (title) query += `+intitle:${title}`;
        if (author) query += `+inauthor:${author}`;

        if (query === '' && field) query += `+subject:${field}`; //field kind of breaks search so only include it if its a sole search term
        query = query.trim();

        let page_offset = 0;
        if (offset) page_offset = Number(offset) * 40;

        // Fetch data from Google Books API
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=40&startIndex=${page_offset}&key=${process.env.GOOGLE_API_KEY}`);
        const books = response.data.items;

        // Send back a summarized list of books
        let index = -1;
        const summarizedBooks = books.map(book => {
            // Extract and return necessary information
            if (book.volumeInfo.language != 'en')
                return

            index++;
            return {
                id: book.id,
                index: index,
                title: book.volumeInfo.title || null,
                subtitle: book.volumeInfo.subtitle || null,
                authors: book.volumeInfo.authors || null,
                publisher: book.volumeInfo.publisher || null,
                published_date: book.volumeInfo.publishedDate || null,
                description: book.volumeInfo.description || null,
                numPages: book.volumeInfo.pageCount || null,
                categories: book.volumeInfo.categories || null,
                averageStars: book.volumeInfo.averageRating || null, //average number starts out of 5
                mature: book.volumeInfo.maturityRating || null, //is 17+ age recommended (NOT_MATURE OR MATURE)
                thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null, //link to image
                saleability: book.saleInfo.sale_price || null, //Is book for sale (FOR_SALE OR NOT_FOR_SALE)
                price: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : null, //recommended price
                sale_price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null, //current best avaialbe price (same as price above or lower if on sale)
            };
        });

        res.status(200).json(summarizedBooks.filter(item => item !== undefined));
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to search for book.'});
    }
};

//find book by its speficied google_id
exports.book_info_from_id = async (req, res) => {
    try {
        const { id } = req.body; 
        // Fetch data from Google Books API
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const book = response.data;

        // Send back a summarized list of books
        const summarizedBook =  {
            id: book.id,
            title: book.volumeInfo.title || null,
            subtitle: book.volumeInfo.subtitle || null,
            authors: book.volumeInfo.authors || null,
            publisher: book.volumeInfo.publisher || null,
            published_date: book.volumeInfo.publishedDate || null,
            description: book.volumeInfo.description || null,
            numPages: book.volumeInfo.pageCount || null,
            categories: book.volumeInfo.categories || null,
            averageStars: book.volumeInfo.averageRating || null, //average number starts out of 5
            mature: book.volumeInfo.maturityRating || null, //is 17+ age recommended (NOT_MATURE OR MATURE)
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null, //link to image thumbnail
            fullImage: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.large : null, //link to full size image
            saleability: book.saleInfo.sale_price || null, //Is book for sale (FOR_SALE OR NOT_FOR_SALE)
            price: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : null, //recommended price
            sale_price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null, //current best avaialbe price (same as price above or lower if on sale)
        };

        res.status(200).json(summarizedBook);
        
    } catch (error) {
        res.status(500).json({'message': 'Failed to find book.'});
    }
};


//get 10 most recently modified public booklists
exports.recent_public_booklists = async (req, res) => {
    try {
        const recent_lists = await booklistModel.ten_most_recent_public_lists();

        res.status(200).json(recent_lists);       
    } catch (error) {
        res.status(500).json({'message': 'Failed to get ten most recent lists.'});   
    }
};



exports.get_book_info_from_list = async (req, res) => {
    try {
        const { list_id } = req.body;

        let is_list_public = booklistModel.is_list_public(list_id);
        if (!is_list_public) {
            res.status(401).json({'message': 'Tried accessing private list that isnt owned by user.'});  
        }

        const list_data = booklistModel.get_list_data(list_id);

        res.status(200).json(list_data);       
    } catch (error) {
        res.status(500).json({'message': 'Failed to open list.'});   
    }
};