const mysql = require('mysql2');
const axios = require('axios');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "BookCommunityApp"
});

db.connect(err =>{
    if(err){
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySql");
});
// why async and what's promise
async function bookExists(googleId){
    const query = "Select * from books where google_id = ?";
    return new Promise((resolve, reject) =>{
        db.query(query, [googleId], (err,result) =>{
            if(err) reject (err);
            resolve(result.length > 0);
        });
    });
}
async function insertBook(book){
    const {google_id, title, authors, published_date , description, thumbnail} = book;
    const query = "insert into books (google_id, title, authors, published_date, description, thumbnail) values (?,?,?,?,?,?)";
    return new Promise((resolve, reject) =>{
        db.query(query, [google_id, title, authors, published_date , description, thumbnail], (err)=>{
            if(err) reject(err);
            resolve();
        });
    });
}

async function fetchBooks(query){
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30`);
    return response.data.items || [];
}

async function preloadBooks(){
    const queries = ['d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    for(let query of queries){
        try{
            const books = await fetchBooks(query);
            for(let book of books){
                const google_id = book.id;
                const volumeInfo = book.volumeInfo;
                const title = volumeInfo.title || 'Unknown';
                const authors = (volumeInfo.authors || []).join(', ') || 'Unknown';
                const publishedDate = volumeInfo.publishedDate;
                const description = volumeInfo.description;
                const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'No Image';

                if(!(await bookExists(google_id))){
                    await insertBook({google_id, title, authors, published_date : publishedDate, description, thumbnail});
                    console.log(`Inserted: ${title}`);
                }
            }
        }
        catch(error){
            console.error('Error', error);
        }
    }
    console.log("Preloading done.")
}
console.log("Starting preload...");
preloadBooks().then(() => {
    db.end();
});