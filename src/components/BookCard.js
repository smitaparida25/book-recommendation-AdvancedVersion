import React from "react";
import {Link} from "react-router-dom";

function BookCard({book}){
    const title = book.volumeInfo.title ||'No title';
    const author = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';
    const bookId = book.id;
    return (
        <div className = "book-card">
            <Link to={`/book/${bookId}`}>
            <img src={thumbnail} alt={title}/>
            <h3>{title}</h3>
            </Link>
            <p>{author}</p>
        </div>
    );
}
export default BookCard;