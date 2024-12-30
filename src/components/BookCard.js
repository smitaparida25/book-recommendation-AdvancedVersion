import React from "react";

function BookCard({book}){
    const title = book.volumeInfo.title ||'No title';
    const author = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';
    return (
        <div className = "book-card">
            <img src={thumbnail} alt={title}/>
            <h3>{title}</h3>
            <p>{author}</p>
        </div>
    )
}
export default BookCard;