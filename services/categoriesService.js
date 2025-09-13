const pool = require("../db/pool");

async function listOfCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories ORDER BY name`);

  return rows;
}

module.exports = {
  listOfCategories,
};
