const db = require('../models');
const IssuedBook = db.IssuedBook;

exports.getAllIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.findAll();
    res.json(issuedBooks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issued books' });
  }
};

exports.addIssuedBook = async (req, res) => {
  try {
    const newIssued = await IssuedBook.create(req.body);
    res.status(201).json(newIssued);
  } catch (err) {
    res.status(500).json({ error: 'Failed to issue book' });
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
          attributes: ['username']
        }
      ]
    });
    res.json(issuedBooks);
  } catch (err) {
    console.error("Error fetching issued books:", err);
    res.status(500).json({ error: 'Failed to fetch issued books' });
  }
};