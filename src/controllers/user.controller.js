const UserService = require('../services/user.service');

exports.create = async (req, res) => {
  const { name, email, role } = req.body;

  const user = await UserService.create({
    name,
    email,
    role,
    password: req.body.password || 'changeme',
  });

  const emaill = user.email

  console.log("email: ", emaill)

  const { password, ...rest } = user;
  res.status(201).json(rest);
};

exports.list = async (req, res) => {
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);

  const users = await UserService.findAll({
    skip: (page - 1) * perPage,
    take: perPage,
  });

  res.json(users);
};

exports.get = async (req, res) => {
  const id = Number(req.params.id);
  const user = await UserService.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  const user = await UserService.update(id, req.body);
  res.json(user);
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  await UserService.delete(id);
  res.status(204).send();
};
