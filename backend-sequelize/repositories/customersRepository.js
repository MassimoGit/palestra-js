const { Customer, Trainer } = require('../models');

// Include usato ovunque per portarsi dietro i dati del trainer
const WITH_TRAINER = {
  include: [{
    model: Trainer,
    as: 'trainer',
    attributes: ['name', 'surname'],
  }],
};

// Mappa l'oggetto Sequelize in un plain object con trainer_name / trainer_surname
// per mantenere la stessa struttura della risposta del backend mysql2
function toPlain(customer) {
  const obj = customer.toJSON();
  obj.trainer_name = obj.trainer?.name ?? null;
  obj.trainer_surname = obj.trainer?.surname ?? null;
  delete obj.trainer;
  return obj;
}

async function findAll() {
  const rows = await Customer.findAll({
    ...WITH_TRAINER,
    order: [['surname', 'ASC'], ['name', 'ASC']],
  });
  return rows.map(toPlain);
}

async function findById(id) {
  const customer = await Customer.findByPk(id, WITH_TRAINER);
  return customer ? toPlain(customer) : null;
}

async function create(data) {
  const customer = await Customer.create(data);
  return await findById(customer.id);
}

async function update(id, data) {
  const customer = await Customer.findByPk(id);
  if (!customer) return null;
  await customer.update(data);
  return await findById(id);
}

async function remove(id) {
  const customer = await Customer.findByPk(id);
  if (!customer) return false;
  await customer.destroy();
  return true;
}

module.exports = { findAll, findById, create, update, remove };
