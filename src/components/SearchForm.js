import { useEffect, useState, useRef } from "react";
import React from "react";
import cloudImage from '../Assets/cute-cloud.png';
import Book from '../Assets/Book.png';
import Chibi from '../Assets/Chibi.png';

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCat, setShowCat] = useState(false);
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
      const fetchSuggestions = async () => {
        if (query.length < 2) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        try {
          const response = await fetch(`http://localhost:5000/suggest?q=${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched suggestions:', data);

          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      };
      
      const timer = setTimeout(() => {
        fetchSuggestions();
      }, 300);

      return () => clearTimeout(timer);
    }, [query]);

    const handleInputChange = (e) => {
      setQuery(e.target.value);
      setShowCat(true);
    };

    const handleSuggestionClick = (suggestion) => {
      setQuery(suggestion);
      setShowSuggestions(false);
    };

    useEffect(() => {
      if(showCat) {
        const timer = setTimeout(() => {
          setShowCat(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [showCat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!query) {
            alert('Please enter a search term!');
            return;
        }
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if(data.items) {
                onSearch(data.items);
            } else {
                alert('No books found. Try another search!');
            }
        } catch (error) {
            alert('Something went wrong. Please try again later.');
            console.error('Search error:', error);
        }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          suggestionsRef.current && 
          !suggestionsRef.current.contains(event.target) &&
          inputRef.current && 
          !inputRef.current.contains(event.target)
        ) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div className="search-input-container">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={handleInputChange}
                className="search-input"
                onClick={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
              />
              <button className="search-button" type="submit">
                <img className="book-icon" src={Book} alt="book"/>
              </button>
            </div>
            {showSuggestions && (
              <ul 
                ref={suggestionsRef}
                className="suggestions-list"
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  zIndex: 100,
                  listStyle: 'none',
                  padding: '8px 0',
                  margin: '0',
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: '8px 16px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    className="suggestion-item"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <img className="cloud-image" src={cloudImage} alt="Cloud" />
          {showCat && (
            <div className="cat-popup">
              <img
                src={Chibi}
                alt="Cat"
                className="cat-image"
              />
            </div>
          )}
        </div>
    );
};

export default SearchForm;