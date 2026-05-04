const customersRepository = require('../repositories/customersRepository');
const trainersRepository = require('../repositories/trainersRepository');

async function getAll() {
  return await customersRepository.findAll();
}

async function create(data) {
  const trainer = await trainersRepository.findById(data.trainer_id);
  if (!trainer) {
    const error = new Error('Trainer associato non trovato');
    error.statusCode = 404;
    throw error;
  }
  return await customersRepository.create(data);
}

async function update(id, data) {
  const customer = await customersRepository.findById(id);
  if (!customer) {
    const error = new Error('Customer non trovato');
    error.statusCode = 404;
    throw error;
  }
  const trainer = await trainersRepository.findById(data.trainer_id);
  if (!trainer) {
    const error = new Error('Trainer associato non trovato');
    error.statusCode = 404;
    throw error;
  }
  return await customersRepository.update(id, data);
}

async function remove(id) {
  const customer = await customersRepository.findById(id);
  if (!customer) {
    const error = new Error('Customer non trovato');
    error.statusCode = 404;
    throw error;
  }
  await customersRepository.remove(id);
}

module.exports = { getAll, create, update, remove };
