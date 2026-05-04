const pool = require('../config/database');

async function findAll() {
  const [rows] = await pool.execute(
    'SELECT id, name, surname, speciality FROM trainer ORDER BY surname, name'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, surname, speciality FROM trainer WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function create(trainer) {
  const [result] = await pool.execute(
    'INSERT INTO trainer (name, surname, speciality) VALUES (?, ?, ?)',
    [trainer.name, trainer.surname, trainer.speciality]
  );
  return result.insertId;
}

async function update(id, trainer) {
  const [result] = await pool.execute(
    'UPDATE trainer SET name = ?, surname = ?, speciality = ? WHERE id = ?',
    [trainer.name, trainer.surname, trainer.speciality, id]
  );
  return result.affectedRows > 0;
}

async function remove(id) {
  const [result] = await pool.execute(
    'DELETE FROM trainer WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
