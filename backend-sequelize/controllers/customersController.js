const customersService = require('../services/customersService');

async function getAll(req, res) {
  try {
    const customers = await customersService.getAll();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Errore nel recupero dei customer' });
  }
}

async function create(req, res) {
  try {
    const customer = await customersService.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const customer = await customersService.update(parseInt(req.params.id), req.body);
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    await customersService.remove(parseInt(req.params.id));
    res.json({ message: 'Customer eliminato' });
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

module.exports = { getAll, create, update, remove };
