const express = require("express");
const Book = require("../models/Book");
const Review = require("../models/Review");
const upload = require("../middleware/upload");

const router = express.Router();


router.post('/', upload.single("bookimage"), async (req, res) => {
  const { bookname, author, description } = req.body;

  try {
    const newBook = new Book({
      bookname,
      author,
      description,
      bookimage: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await newBook.save();
    res.status(201).json({ msg: 'Book created successfully', book: newBook });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: "Failed to find books" });
  }
});


router.get('/search', async (req, res) => {
  try {
    const { book } = req.query;
    const result = await Book.find({ bookname: new RegExp(book, 'i') });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
});


router.get('/top-rated', async (req, res) => {
  try {
    const books = await Book.find().sort({ averagerating: -1 }).limit(5);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch top-rated books" });
  }
});


router.post('/:bookId/reviews', async (req, res) => {
  const { bookId } = req.params;
  const { username, rating, comment } = req.body;

  try {
    const review = new Review({
      username,
      book: bookId,
      rating: Number(rating),
      comment
    });

    await review.save();

    const reviews = await Review.find({ book: bookId });
    const avgrating = (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1);

    await Book.findByIdAndUpdate(bookId, {
      averagerating: avgrating,
      numreviews: reviews.length
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Review submission failed:", err);
    res.status(500).json({ message: "Failed to add review." });
  }
});


router.get('/:bookId/reviews', async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book: bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to get reviews" });
  }
});


router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch book details" });
  }
});

module.exports = router;
