const BookRepo = require('../repositories/book.repo');
const UserRepo = require('../repositories/user.repo');
const redis = require('../config/redis');

const BOOKS_CACHE_KEY = 'books:all';

exports.create = async (data) => {
  const user = await UserRepo.findById(data.userid)
  if (!user) {
    const error = new Error('user not found, cannot insert new book record.');
    error.status = 404
    throw error
  }
  const book = await BookRepo.create(data);
  await redis.del(BOOKS_CACHE_KEY);
  return book;
};

exports.findAll = async (opts = {}) => {
  const cached = await redis.get(BOOKS_CACHE_KEY);
  if (cached) return JSON.parse(cached);

  const books = await BookRepo.findAll(opts);
  await redis.set(BOOKS_CACHE_KEY, JSON.stringify(books), 'EX', 60);

  return books;
};

exports.findById = (id) => BookRepo.findById(id);

exports.update = async (id, data) => {
  const book = await BookRepo.update(id, data);
  await redis.del(BOOKS_CACHE_KEY);
  return book;
};

exports.delete = async (id) => {
  const book = await BookRepo.delete(id);
  await redis.del(BOOKS_CACHE_KEY);
  return book;
};
