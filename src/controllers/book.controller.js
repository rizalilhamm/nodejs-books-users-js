const BookService = require('../services/book.service');

/**
 * Create a new book
 */
exports.create = async (req, res) => {
  try {
    const { title, author, userId } = req.body;

    const book = await BookService.create({
      title,
      author,
      userId: Number(userId),
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * List all books with pagination
 */
exports.list = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const books = await BookService.findAll({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get a single book by ID
 */
exports.get = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await BookService.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update a book by ID
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedBook = await BookService.update(id, req.body);

    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Delete a book by ID
 */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await BookService.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
