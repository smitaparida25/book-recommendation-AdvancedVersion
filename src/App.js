import React, {useState} from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Favorites from './components/Favorites';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupOrLogin from './components/SignupOrLogin';
import Dashboard from './components/Dashboard';

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
            <Routes>
            <Route
                path = "/"
                element = {
                    <>
                    <h1 style={{position: 'relative', top: '-8px', fontSize: '38px',}}>Book Recommendation</h1>
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
            <Link to="/auth">
            <button className="auth-button">SignUp or Login</button>
            </Link>
                    </>
                }
                />
            <Route path="/auth" element={<SignupOrLogin isLogin={false} />} />
            <Route path="/auth" element={<SignupOrLogin isLogin={true} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
        </Router>
    );
};

export default App;