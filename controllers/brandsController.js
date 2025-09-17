const brandsService = require("../services/brandsService");

async function getAllBrands(req, res) {
  const brands = await brandsService.listOfBrands();
  res.render("brands/index", { brands });
}

async function showBrand(req, res) {
  const { id } = req.params;
  const brand = await brandsService.getBrandById(id);
  const instruments = await brandsService.getInstrumentsByBrand(id);
  res.render("brands/showBrand", { brand, instruments });
}

function getForm(req, res) {
  res.render("brands/form");
}

async function createBrand(req, res) {
  const { name, country } = req.body;
  await brandsService.createBrand(name, country);
  res.redirect("/brands");
}

async function editBrand(req, res) {
  const { id } = req.params;
  const brand = await brandsService.getBrandById(id);
  res.render("brands/editBrand", { brand });
}

async function updateBrand(req, res) {
  const { id } = req.params;
  const { name, country } = req.body;
  await brandsService.updateBrand(id, name, country);
  res.redirect("/brands");
}

async function deleteBrand(req, res) {
  const { id } = req.params;
  await brandsService.deleteBrand(id);
  res.redirect("/brands");
}

module.exports = {
  getAllBrands,
  showBrand,
  getForm,
  createBrand,
  editBrand,
  updateBrand,
  deleteBrand,
};
