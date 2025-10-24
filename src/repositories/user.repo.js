const prisma = require('../config/prisma');

exports.create = (data) =>
  prisma.user.create({ data });

exports.findAll = ({ skip = 0, take = 10 } = {}) =>
  prisma.user.findMany({
    skip,
    take,
    include: { books: true },
  });

exports.findById = (id) =>
  prisma.user.findUnique({
    where: { id },
    include: { books: true },
  });

exports.findByEmail = (email) =>
  prisma.user.findUnique({
    where: { email },
  });

exports.update = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
  });

exports.delete = (id) =>
  prisma.user.delete({
    where: { id },
  });
