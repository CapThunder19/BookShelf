import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    bookname: '',
    author: '',
    description: '',
    bookimage: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'bookimage') {
      setFormdata({ ...formdata, bookimage: files[0] });
    } else {
      setFormdata({ ...formdata, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      for (let key in formdata) {
        form.append(key, formdata[key]);
      }

      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3002/api/books', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Book added successfully!');
      setFormdata({
        bookname: '',
        author: '',
        description: '',
        bookimage: null,
      });

      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add book');
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/capmfire.jpeg')",
        backgroundColor: "oklch(0.283 0.141 291.089)",
      }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
    >
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-[#f5f3f7] shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#5d4a7f]">Add a New Book</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold">Book Name</label>
          <input
            type="text"
            name="bookname"
            value={formdata.bookname}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5d4a7f]"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={formdata.author}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5d4a7f]"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={formdata.description}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5d4a7f]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Book Image</label>
          <input
            type="file"
            name="bookimage"
            accept="image/*"
            onChange={handleChange}
            className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#5d4a7f] file:text-white
              hover:file:bg-[#4a3b66]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5d4a7f] hover:bg-[#4a3b66] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Book
        </button>
      </form>

      {message && (
        <p className="mt-6 text-center text-md font-semibold text-red-600">{message}</p>
      )}
    </div>
    </div>
  );
};

export default AddBook;
