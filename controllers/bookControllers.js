const db = require('../models');
const Book = db.Book;
const IssuedBook = db.IssuedBook;



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





// ✅ Issue a book
exports.issueBook = async (req, res) => {
  const { title, issuedTo, issue_date, due_date } = req.body;

  try {
    // Find the book by title
    const book = await Book.findOne({ where: { Title: title } });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.Avaible_copies <= 0) {
      return res.status(400).json({ error: 'No available copies' });
    }

    // Create issued book record
    const issued = await IssuedBook.create({
      users_id: issuedTo, // assuming this is user ID
      books_id: book.id_books,
      issue_date,
      due_date,
      return_date: null,
      fine_amount: 0,
      isReturned: false
    });

    // Decrement available copies
    book.Avaible_copies -= 1;
    await book.save();

    res.status(201).json({ message: 'Book issued successfully', issued });
  } catch (err) {
    console.error('Error issuing book:', err);
    res.status(500).json({ error: 'Failed to issue book' });
  }
};

// ✅ Update available copies
exports.updateBookCopies = async (req, res) => {
  const { title, Avaible_copies } = req.body;

  try {
    const book = await Book.findOne({ where: { Title: title } });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.Avaible_copies = Avaible_copies;
    await book.save();

    res.json({ message: 'Available copies updated', book });
  } catch (err) {
    console.error('Error updating copies:', err);
    res.status(500).json({ error: 'Failed to update available copies' });
  }
};