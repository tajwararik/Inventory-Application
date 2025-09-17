const pool = require("../db/pool");

async function listOfCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories ORDER BY name`);

  return rows;
}

async function getCategoryById(id) {
  const result = await pool.query(`SELECT * FROM categories WHERE id=$1 `, [
    id,
  ]);

  return result.rows[0];
}

async function getInstrumentsByCategory(id) {
  const { rows } = await pool.query(
    `SELECT i.* 
     FROM instruments i
     WHERE i.category_id = $1
     ORDER BY i.name`,
    [id]
  );

  return rows;
}

async function createCategory(name, description) {
  await pool.query(
    `INSERT INTO categories (name, description)
    VALUES ($1, $2)`,
    [name, description]
  );
}

async function updateCategory(id, name, description) {
  await pool.query(
    `UPDATE categories SET name=$1, description=$2 WHERE id=$3`,
    [name, description, id]
  );
}

async function deleteCategory(id) {
  await pool.query(`DELETE FROM categories WHERE id=$1`, [id]);
}

module.exports = {
  listOfCategories,
  getCategoryById,
  getInstrumentsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
