import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Bookcard from '../components/Bookcard'; 

const Searchresult = () => {
  const [searchParams] = useSearchParams(); 
  const [result, setResult] = useState([]);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/books/search?book=${encodeURIComponent(query)}`)
        .then((res) => setResult(res.data))
        .catch((err) => {
          console.error("Search error:", err);
          setResult([]);
        });
    }
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
        Search Results for "<span className="italic">{query}</span>"
      </h2>

      {result.length === 0 ? (
        <div className="text-gray-500 text-center py-10 border rounded bg-gray-50">
          No books found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {result.map((book) => (
            <Bookcard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchresult;
