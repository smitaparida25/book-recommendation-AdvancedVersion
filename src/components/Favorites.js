import React from "react";

const Favorites = ({favorites}) => {
    return(
        <div className="favorites">
            <h2>Favorites</h2>
            {favorites.length == 0?(
                <p>No favorite books added yet.</p>
            ) : (
                favorites.map((book) => (
                    <div key={book.id}>
                        <h3>{book.volumeInfo.title}</h3>
                        <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                    </div>
                ))
            )}
        </div>
    );
};
export default Favorites;
