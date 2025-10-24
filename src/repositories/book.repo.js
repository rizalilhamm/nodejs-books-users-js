const prisma = require('../config/prisma');
exports.create = (data) => prisma.book.create({ data });
exports.findAll = ({ skip = 0, take = 10 } = {}) => prisma.book.findMany({ skip, take, include: { user: true } });
exports.findById = (id) => prisma.book.findUnique({ where: { id }, include: { user: true } });
exports.update = (id, data) => prisma.book.update({ where: { id }, data });
exports.delete = (id) => prisma.book.delete({ where: { id } });
