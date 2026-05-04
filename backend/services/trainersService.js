const trainersRepository = require('../repositories/trainersRepository');

async function getAll() {
  return await trainersRepository.findAll();
}

async function create(data) {
  const insertId = await trainersRepository.create(data);
  return await trainersRepository.findById(insertId);
}

async function update(id, data) {
  const trainer = await trainersRepository.findById(id);

  if (!trainer) {
    const error = new Error('Trainer non trovato');
    error.statusCode = 404;
    throw error;
  }

  await trainersRepository.update(id, data);
  return await trainersRepository.findById(id);
}

async function remove(id) {
  const trainer = await trainersRepository.findById(id);

  if (!trainer) {
    const error = new Error('Trainer non trovato');
    error.statusCode = 404;
    throw error;
  }

  await trainersRepository.remove(id);
}

module.exports = { getAll, create, update, remove };
