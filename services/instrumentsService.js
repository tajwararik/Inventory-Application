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

module.exports = {
  listOfInstruments,
};
