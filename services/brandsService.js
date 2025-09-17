const pool = require("../db/pool");

async function listOfBrands() {
  const { rows } = await pool.query(`SELECT * FROM brands ORDER BY name`);

  return rows;
}

async function getBrandById(id) {
  const result = await pool.query(`SELECT * FROM brands WHERE id=$1 `, [id]);

  return result.rows[0];
}

async function getInstrumentsByBrand(id) {
  const { rows } = await pool.query(
    `SELECT i.* 
     FROM instruments i
     WHERE i.brand_id = $1
     ORDER BY i.name`,
    [id]
  );

  return rows;
}

async function createBrand(name, country) {
  await pool.query(
    `INSERT INTO brands (name, country)
    VALUES ($1, $2)`,
    [name, country]
  );
}

async function updateBrand(id, name, country) {
  await pool.query(`UPDATE brands SET name=$1, country=$2 WHERE id=$3`, [
    name,
    country,
    id,
  ]);
}

async function deleteBrand(id) {
  await pool.query(`DELETE FROM brands WHERE id=$1`, [id]);
}

module.exports = {
  listOfBrands,
  getBrandById,
  getInstrumentsByBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
