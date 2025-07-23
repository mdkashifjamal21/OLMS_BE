const db = require('../models');
const Book = db.Book;

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.update(req.body, {
      where: { id_books: req.params.id }
    });
    res.json({ updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { id_books: req.params.id }
    });
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) res.json(book);
    else res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get book' });
  }
};
exports.getBooksByUserId = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [{
        model: db.IssuedBook,
        where: { users_id: req.params.userId }
      }]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books for user' });
  }
};