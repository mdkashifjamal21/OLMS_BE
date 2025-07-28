const db = require('../models');
const IssuedBook = db.IssuedBook;

exports.addIssuedBook = async (req, res) => {
  try {
    const {
      users_id,
      books_id,
      issue_date,
      due_date,
      return_date,
      fine_amount,
      isReturned
    } = req.body;

    // Basic validation
    if (
      !users_id ||
      !books_id ||
      !issue_date ||
      !due_date ||
      fine_amount === undefined ||
      isReturned === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Optional: validate foreign keys exist
    const user = await db.User.findByPk(users_id);
    const book = await db.Book.findByPk(books_id);

    if (!user || !book) {
      return res.status(400).json({ error: "Invalid user or book ID" });
    }

    const newIssued = await IssuedBook.create({
      users_id,
      books_id,
      issue_date,
      due_date,
      return_date,
      fine_amount,
      isReturned
    });

    res.status(201).json(newIssued);
  } catch (err) {
    console.error("Error issuing book:", err);
    res.status(500).json({ error: 'Failed to issue book', details: err.message });
  }
};


exports.updateIssuedBook = async (req, res) => {
  try {
    const updated = await IssuedBook.update(req.body, {
      where: { id_issue: req.params.id }
    });
    res.json({ updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update issued book' });
  }
};

exports.deleteIssuedBook = async (req, res) => {
  try {
    const deleted = await IssuedBook.destroy({
      where: { id_issue: req.params.id }
    });
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete issued book' });
  }
};

exports.getIssuedBookById = async (req, res) => {
  try {
    const issued = await IssuedBook.findByPk(req.params.id);
    if (issued) res.json(issued);
    else res.status(404).json({ message: 'Issued book not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issued book' });
  }
};
exports.getAllIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.findAll({
      include: [
        {
          model: db.Book,
          attributes: ['Title', 'Author']
        },
        {
          model: db.User,
          attributes: ['name']
        }
      ]
    });
    res.json(issuedBooks);
  } catch (err) {
    console.error("Error fetching issued books:", err); // 👈 Add this
    res.status(500).json({ error: 'Failed to fetch issued books' });
  }
};




exports.returnIssuedBook = async (req, res) => {
  try {
    const { id } = req.params;
    const returnDate = dayjs().format("YYYY-MM-DD");

    const issuedBook = await IssuedBook.findByPk(id);
    if (!issuedBook) {
      return res.status(404).json({ error: "Issued book not found" });
    }

    if (issuedBook.isReturned) {
      return res.status(400).json({ error: "Book already returned" });
    }

    const dueDate = dayjs(issuedBook.due_date);
    const actualReturnDate = dayjs(returnDate);
    const overdueDays = actualReturnDate.diff(dueDate, "day");

    const fine = overdueDays > 0 ? overdueDays * 10 : 0;

    issuedBook.return_date = returnDate;
    issuedBook.isReturned = true;
    issuedBook.fine_amount = fine;

    await issuedBook.save();

    const book = await db.Book.findByPk(issuedBook.books_id);
    book.Avaible_copies += 1;
    await book.save();

    res.json({ message: "Book returned successfully", fine, issuedBook });
  } catch (err) {
    console.error("Error returning book:", err);
    res.status(500).json({ error: "Failed to return book" });
  }
};