import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const getImageSrc = () => {
    if (book.bookimage?.data) {
      const base64String = btoa(
        new Uint8Array(book.bookimage.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:${book.bookimage.contentType};base64,${base64String}`;
    }
    return null;
  };

  const imageSrc = getImageSrc();

  return (
    <Link to={`/books/${book._id}`} className="group">
      <div
        className="border rounded-lg shadow-md bg-white hover:shadow-lg transition
                   flex flex-col items-center p-4 cursor-pointer
                   hover:scale-[1.03] transform duration-300"
      >
        <div
          className="w-full h-56 mb-4 flex items-center justify-center bg-purple-50 rounded-lg overflow-hidden"
          style={{ minHeight: '224px' }} 
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={book.bookname}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="text-purple-300 text-center px-2">
              <p>No Image Available</p>
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold text-purple-800 text-center mb-1 truncate">
          {book.bookname}
        </h3>
        <p className="text-gray-700 text-center mb-2 truncate">Author: {book.author}</p>
        <p className="text-yellow-500 font-semibold text-center">
          ⭐ {book.numreviews > 0 ? Number(book.averagerating).toFixed(1) : "No rating"}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
