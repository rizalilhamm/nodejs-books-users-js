const UserRepo = require('../repositories/user.repo');
const redis = require('../config/redis');

const USERS_CACHE_KEY = 'users:all';

/**
 * Create a new user and clear cache
 */
exports.create = async (data) => {
  const user = await UserRepo.create(data);
  await redis.del(USERS_CACHE_KEY);
  return user;
};

/**
 * Get all users (cached)
 */
exports.findAll = async (opts = {}) => {
  const cached = await redis.get(USERS_CACHE_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  const users = await UserRepo.findAll(opts);
  await redis.set(USERS_CACHE_KEY, JSON.stringify(users), 'EX', 60);

  return users;
};

/**
 * Find a user by ID
 */
exports.findById = (id) => UserRepo.findById(id);

/**
 * Update a user and clear cache
 */
exports.update = async (id, data) => {
  const user = await UserRepo.update(id, data);
  await redis.del(USERS_CACHE_KEY);
  return user;
};

/**
 * Delete a user and clear cache
 */
exports.delete = async (id) => {
  const user = await UserRepo.delete(id);
  await redis.del(USERS_CACHE_KEY);
  return user;
};
