const { Trainer } = require('../models');

async function findAll() {
  return await Trainer.findAll({
    order: [['surname', 'ASC'], ['name', 'ASC']],
  });
}

async function findById(id) {
  return await Trainer.findByPk(id);
}

async function create(data) {
  return await Trainer.create(data);
}

async function update(id, data) {
  const trainer = await Trainer.findByPk(id);
  if (!trainer) return null;
  return await trainer.update(data);
}

async function remove(id) {
  const trainer = await Trainer.findByPk(id);
  if (!trainer) return false;
  await trainer.destroy();
  return true;
}

module.exports = { findAll, findById, create, update, remove };
