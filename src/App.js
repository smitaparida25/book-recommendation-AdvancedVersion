import React, {useState} from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Favorites from './components/Favorites';
// app is the component
const App = () => {
    // books is the arrray which is initially empty and setBooks is the function to update the array.
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);


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
            <Favorites Favorites = {favorites}/>
        </div>
    );
};

export default App;