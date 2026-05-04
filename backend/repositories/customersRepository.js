const pool = require('../config/database');

const SELECT_WITH_TRAINER = `
  SELECT
    c.id,
    c.name,
    c.surname,
    c.email,
    c.trainer_id,
    t.name AS trainer_name,
    t.surname AS trainer_surname
  FROM customer c
  INNER JOIN trainer t ON c.trainer_id = t.id
`;

async function findAll() {
  const [rows] = await pool.execute(
    `${SELECT_WITH_TRAINER} ORDER BY c.surname, c.name`
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `${SELECT_WITH_TRAINER} WHERE c.id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function create(customer) {
  const [result] = await pool.execute(
    `INSERT INTO customer (name, surname, email, trainer_id) VALUES (?, ?, ?, ?)`,
    [customer.name, customer.surname, customer.email, customer.trainer_id]
  );
  return result.insertId;
}

async function update(id, customer) {
  const [result] = await pool.execute(
    `UPDATE customer SET name = ?, surname = ?, email = ?, trainer_id = ? WHERE id = ?`,
    [customer.name, customer.surname, customer.email, customer.trainer_id, id]
  );
  return result.affectedRows > 0;
}

async function remove(id) {
  const [result] = await pool.execute(
    'DELETE FROM customer WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
