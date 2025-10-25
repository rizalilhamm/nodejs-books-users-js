const fundraiserRepo = require('../repositories/fundraiser.repo');


exports.findAll = async (opts = {}) => {

  const fundraisers = await fundraiserRepo.findAll(opts);

  return fundraisers;
};
