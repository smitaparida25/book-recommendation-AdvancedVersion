import { useEffect, useState } from "react";
import React from "react";
import cloudImage from '../Assets/cute-cloud.png';
import Book from '../Assets/Book.png';
import Chibi from '../Assets/Chibi.png'

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [showCat, setShowCat] = useState(false);

    const handleInputChange = async(e) =>{
      setQuery(e.target.value);
      setShowCat(true);
    }

    useEffect(() =>{
      if(showCat){
        const timer = setTimeout(() => {
          setShowCat(false);
        }, 3000);
        return() => clearTimeout(timer);
      }
    }, [showCat]);
    console.log("ShowCat state:", showCat);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!query){
            alert('Please enter a search term!');
            return;
        }
        try{
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            const data = await response.json();

            if(data.items){
                onSearch(data.items);
            } else{
                alert('No books found. Try another search!');
            }
        } catch (error){
            alert('Something went wrong. Please try again later.');
        }
    };
    return (
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={handleInputChange}
              className="search-input"
            />
            <button className="search-button" type="submit"><img className="book-icon" src={Book} alt="book"/></button>
          </form>
          <img className="cloud-image" src={cloudImage} alt="Cloud" />
          {showCat && (
            <div className="cat-popup">
          <img
            src={Chibi} // Replace with your cat image URL
            alt="Cat"
            className="cat-image"
          />
        </div>
      )}
        </div>
      );
};


export default SearchForm;
