const trainersService = require('../services/trainersService');

async function getAll(req, res) {
  try {
    const trainers = await trainersService.getAll();
    res.json(trainers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Errore nel recupero dei trainer' });
  }
}

async function create(req, res) {
  try {
    const trainer = await trainersService.create(req.body);
    res.status(201).json(trainer);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const trainer = await trainersService.update(parseInt(req.params.id), req.body);
    res.json(trainer);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    await trainersService.remove(parseInt(req.params.id));
    res.json({ message: 'Trainer eliminato' });
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

module.exports = { getAll, create, update, remove };
