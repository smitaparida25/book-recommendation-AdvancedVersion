import React, {use, useState} from 'react';
import './components/App.css';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Favorites from '/componnents/Favorites';
// app is the component
const App = () => {
    // books is the arrray which is initially empty and setBooks is the function to update the array.
    const [books, setBooks] = useState([]);
    const [Favorites, setFavorites] = useState([]);


    const handleSearch = (results) => {
        setBooks(results);
    };
    const handleAddFavorites = (book) => {
        // add on
        setFavorites((prev) => [...prev,book]);
    };

    return(
        <div className="app">
            <h1>Book Recommendation app</h1>
            <SearchForm onSearch={handleSearch}/>
            <div className="book-list">
                {books.map((book) =>(
                    <BookCard
                    key = {book.id}
                    book = {book}
                    onAddFavorites = {handleAddFavorites}
                    />
                ))}
            </div>
            <Favorites Favorites = {Favorites}/>
        </div>
    );
};

export default App;