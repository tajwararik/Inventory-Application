const instrumentsService = require("../services/instrumentsService");
const categoriesService = require("../services/categoriesService");
const brandsService = require("../services/brandsService");

async function getAllInstruments(req, res) {
  const instruments = await instrumentsService.listOfInstruments();
  res.render("instruments/index", { instruments });
}

async function showInstrument(req, res) {
  const { id } = req.params;
  const instrument = await instrumentsService.getInstrumentDetails(id);
  res.render("instruments/showInstrument", { instrument });
}

async function getForm(req, res) {
  const categories = await categoriesService.listOfCategories();
  const brands = await brandsService.listOfBrands();
  res.render("instruments/form", { categories, brands });
}

async function createInstrument(req, res) {
  const {
    name,
    category_id,
    brand_id,
    serial_number,
    condition,
    quantity,
    price,
  } = req.body;

  await instrumentsService.createInstrument(
    name,
    category_id,
    brand_id,
    serial_number,
    condition,
    quantity,
    price
  );

  res.redirect("/instruments");
}

async function deleteInstrument(req, res) {
  const { id } = req.params;
  await instrumentsService.deleteInstrument(id);
  res.redirect("/instruments");
}

async function editInstrument(req, res) {
  const { id } = req.params;
  const instrument = await instrumentsService.getInstrumentDetails(id);
  const categories = await categoriesService.listOfCategories();
  const brands = await brandsService.listOfBrands();
  res.render("instruments/editInstrument", { instrument, categories, brands });
}

async function updateInstrument(req, res) {
  const { id } = req.params;
  const {
    name,
    category_id,
    brand_id,
    serial_number,
    condition,
    quantity,
    price,
  } = req.body;
  await instrumentsService.updateInstrument(
    id,
    name,
    category_id,
    brand_id,
    serial_number,
    condition,
    quantity,
    price
  );
  res.redirect("/instruments");
}

module.exports = {
  getAllInstruments,
  showInstrument,
  getForm,
  createInstrument,
  deleteInstrument,
  editInstrument,
  updateInstrument,
};
