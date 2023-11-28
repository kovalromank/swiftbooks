const axios = require('axios');


exports.search = async (req, res) => {
    //offset expects 0 / null, or number of times user presses load more
    try {
        const { author, field, title, offset } = req.body; //i am assuming field means genre of book

        let query = '';
        if (title) query += `${title}`;
        if (title) query += `+intitle:${title}`;
        if (author) query += `+inauthor:${author}`;
        if (field) query += `+subject:${field}`; //field kind of breaks search so only include it if its a sole search term
        query = query.trim();

        let page_offset = 0;
        if (offset) page_offset = Number(offset) * 40;

        // Fetch data from Google Books API
        console.log(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&startIndex=${page_offset}&key=${process.env.GOOGLE_API_KEY}`)
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&startIndex=${page_offset}&key=${process.env.GOOGLE_API_KEY}`);
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
                published_date: book.volumeInfo.publishedDate || null,
                mature: book.volumeInfo.maturityRating || null,
                thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
                price: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : null,
                sale_price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null,
            };
        });


        res.status(200).json(summarizedBooks.filter(item => item !== undefined));
        
    } catch (error) {
        console.log(error)
        res.status(500).json({'message': 'Failed to search for book.'});
    }
};