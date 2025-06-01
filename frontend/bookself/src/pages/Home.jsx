import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from '../components/Bookcard';

const Home = () => {
  const [search, setSearch] = useState('');
  const [topBooks, setTopBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const top = await axios.get('http://localhost:3002/api/books/top-rated');
        const all = await axios.get('http://localhost:3002/api/books');
        setTopBooks(top.data);
        setAllBooks(all.data);
        setFilteredBooks(all.data);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      allBooks.filter(book =>
        book.bookname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allBooks]);

  return (
    <div
      className="min-h-screen bg-cover bg-center px-6 py-10"
      style={{
        backgroundImage: "url('/capmfire.jpeg')",
        backgroundColor: 'oklch(0.283 0.141 291.089)',
      }}
    >
     
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
        
        <div className="flex-1">
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to Bookshelf</h1>
          <input
            type="text"
            placeholder="Search books..."
            className="w-full px-4 py-2 rounded-lg text-amber-50 border border-purple-600 focus:outline-none focus:ring-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        
        <div className="flex-1 w-full overflow-hidden relative rounded-lg shadow-lg max-h-[320px] h-[320px]">
          <div className="flex animate-slide h-full">
            {topBooks.map((book, idx) => {
              const base64String = book.bookimage?.data
                ? btoa(
                    new Uint8Array(book.bookimage.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  )
                : null;
              const imageSrc = base64String
                ? `data:${book.bookimage.contentType};base64,${base64String}`
                : null;

              return (
                <div
                  key={idx}
                  className="min-w-full relative flex justify-start items-start text-white p-6"
                  style={{
                    backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '320px',
                    borderRadius: '0.5rem',
                  }}
                >
                  <div
                    className="bg-purple-900 bg-opacity-70 p-4 rounded-md max-w-xs"
                    style={{ backdropFilter: 'blur(6px)' }}
                  >
                    <h2 className="text-2xl font-semibold mb-2">{book.bookname}</h2>
                    <p className="italic text-lg">{book.author}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      
      <div className="flex flex-col md:flex-row gap-6">
       
        <div className="md:w-[30%] bg-transparent p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-220px)]">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">Top Rated Books</h3>
          <div className="grid grid-cols-1 gap-4">
            {topBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>

        
        <div className="md:w-[70%] bg-transparent p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-220px)]">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">All Books</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredBooks.map((book) => (
              <Link to={`/books/${book._id}`} key={book._id}>
                <BookCardWithDescription book={book} />
              </Link>
            ))}
          </div>
        </div>
      </div>

     
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            20% { transform: translateX(0); }
            25% { transform: translateX(-100%); }
            45% { transform: translateX(-100%); }
            50% { transform: translateX(-200%); }
            70% { transform: translateX(-200%); }
            75% { transform: translateX(-300%); }
            95% { transform: translateX(-300%); }
            100% { transform: translateX(0); }
          }
          .animate-slide {
            display: flex;
            animation: slide 20s infinite;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};


const BookCardWithDescription = ({ book }) => {
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
    <div
      className="border rounded-lg shadow-md bg-white flex p-4 hover:shadow-lg transition cursor-pointer"
      style={{ gap: '1rem' }}
    >
      <div className="flex-shrink-0 w-32 h-44 bg-purple-50 rounded-lg overflow-hidden flex items-center justify-center">
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

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-purple-800 mb-1">{book.bookname}</h3>
          <p className="text-gray-700 mb-2">Author: {book.author}</p>
          <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
        </div>
        <p className="text-yellow-500 font-semibold mt-2">
          ⭐ {book.numreviews > 0 ? Number(book.averagerating).toFixed(1) : "No rating"}
        </p>
      </div>
    </div>
  );
};

export default Home;
