const FundRaiserService = require('../services/fundraiser.service');

/**
 * Create a new book
 */

/**
 * List all books with pagination
 */
exports.list = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const funraisers = await FundRaiserService.findAll({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    res.json(funraisers);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
