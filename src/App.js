import React, {useState} from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Favorites from './components/Favorites';
import BookPage from './components/BookPage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupOrLogin from './components/SignupOrLogin';

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
        <Router>
        <div className="app">
            <Link to="/auth">
            <button className="auth-button">SignUp or Login</button>
            </Link>
            <Routes>
            <Route
                path = "/"
                element = {
                    <>
                    <h1>Book Recommendation</h1>
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
            <Favorites favorites = {favorites}/>
                    </>
                }
                />
            <Route path = "/auth"element={<SignupOrLogin/>}/>
            <Route path="/book/:id" element={<BookPage books={books}/>}/>
            </Routes>
        </div>
        </Router>
    );
};

export default App;