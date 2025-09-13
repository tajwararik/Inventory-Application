const pool = require("../db/pool");

async function listOfInstruments() {
  const { rows } = await pool.query(
    `SELECT i.*, c.name as category_name, b.name as brand_name
     FROM instruments i
     JOIN categories c ON i.category_id = c.id
     JOIN brands b ON i.brand_id = b.id
     ORDER BY i.name`
  );

  return rows;
}

async function getInstrumentDetails(id) {
  const result = await pool.query(
    `SELECT i.*, c.name AS category_name, b.name AS brand_name
     FROM instruments i
     JOIN categories c ON i.category_id = c.id
     JOIN brands b ON i.brand_id = b.id
     WHERE i.id = $1`,
    [id]
  );

  return result.rows[0];
}

async function createInstrument(
  name,
  category_id,
  brand_id,
  serial_number,
  condition,
  quantity,
  price
) {
  await pool.query(
    `INSERT INTO instruments (name, category_id, brand_id, serial_number,condition, quantity, price) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [name, category_id, brand_id, serial_number, condition, quantity, price]
  );
}

async function deleteInstrument(id) {
  await pool.query(`DELETE FROM instruments WHERE id=$1`, [id]);
}

async function updateInstrument(
  id,
  name,
  category_id,
  brand_id,
  serial_number,
  condition,
  quantity,
  price
) {
  await pool.query(
    `UPDATE instruments SET name=$1, category_id=$2, brand_id=$3, serial_number=$4, condition=$5, quantity=$6, price=$7 WHERE id=$8`,
    [name, category_id, brand_id, serial_number, condition, quantity, price, id]
  );
}

module.exports = {
  listOfInstruments,
  getInstrumentDetails,
  createInstrument,
  deleteInstrument,
  updateInstrument,
};
