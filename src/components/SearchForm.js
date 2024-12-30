import { useState } from "react";
import React from "react";

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');
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
                // handleSearch is called
                onSearch(data.items);
            } else{
                alert('No books found. Try another search!');
            }
        } catch (error){
            alert('Something went wrong. Please try again later.');
        }
    };

        return(
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Search for books..."
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        );
};
export default searchForm;
