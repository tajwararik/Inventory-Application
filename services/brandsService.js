const pool = require("../db/pool");

async function listOfBrands() {
  const { rows } = await pool.query(`SELECT * FROM brands ORDER BY name`);

  return rows;
}

module.exports = {
  listOfBrands,
};
