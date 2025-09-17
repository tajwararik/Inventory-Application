const categoriesService = require("../services/categoriesService");

async function getAllCategories(req, res) {
  const categories = await categoriesService.listOfCategories();
  res.render("categories/index", { categories });
}

async function showCategory(req, res) {
  const { id } = req.params;
  const category = await categoriesService.getCategoryById(id);
  const instruments = await categoriesService.getInstrumentsByCategory(id);
  res.render("categories/showCategory", { category, instruments });
}

function getForm(req, res) {
  res.render("categories/form");
}

async function createCategory(req, res) {
  const { name, description } = req.body;
  await categoriesService.createCategory(name, description);
  res.redirect("/categories");
}

async function editCategory(req, res) {
  const { id } = req.params;
  const category = await categoriesService.getCategoryById(id);
  res.render("categories/editCategory", { category });
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  await categoriesService.updateCategory(id, name, description);
  res.redirect("/categories");
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  await categoriesService.deleteCategory(id);
  res.redirect("/categories");
}

module.exports = {
  getAllCategories,
  showCategory,
  getForm,
  createCategory,
  editCategory,
  updateCategory,
  deleteCategory,
};
