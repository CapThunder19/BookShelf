import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Starrating from '../components/Starrating';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/api/books/${bookId}`);
      setBook(res.data);
    } catch (err) {
      console.error('Error fetching book:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/api/books/${bookId}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !comment || rating === 0) return;

    try {
      setLoading(true);
      await axios.post(`http://localhost:3002/api/books/${bookId}/reviews`, {
        username,
        rating,
        comment,
      });
      setUsername('');
      setRating(0);
      setComment('');
      fetchBook();
      fetchReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = () => {
    if (book?.bookimage?.data) {
      const base64String = btoa(
        new Uint8Array(book.bookimage.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      return `data:${book.bookimage.contentType};base64,${base64String}`;
    }
    return null;
  };

  if (!book) return <div className="text-center mt-10 text-lg">Loading book details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3 flex items-center justify-center bg-purple-50 rounded-lg">
          {getImageSrc() ? (
            <img
              src={getImageSrc()}
              alt={book.bookname}
              className="max-w-full max-h-[400px] object-contain"
            />
          ) : (
            <p className="text-gray-400">No Image</p>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-purple-800 mb-2">{book.bookname}</h2>
          <p className="text-lg text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
          <p className="text-sm text-gray-600 mb-4">{book.description}</p>
          <p className="text-yellow-500 font-semibold">
            ⭐ {book.numreviews > 0 ? Number(book.averagerating).toFixed(1) : 'No rating'}
          </p>
        </div>
      </div>

      
      <div className="bg-purple-50 p-4 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-2 text-purple-700">Add a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Starrating value={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="text-sm text-yellow-600">You rated: {rating} star{rating > 1 ? 's' : ''}</p>
          )}

          <textarea
            placeholder="Write your comment..."
            className="w-full p-2 border rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>

      
      <div>
        <h3 className="text-xl font-semibold text-purple-700 mb-3">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded p-3 bg-white shadow-sm"
              >
                <p className="font-semibold text-purple-800">{review.username}</p>
                <p className="text-yellow-500 mb-1">⭐ {review.rating}</p>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
