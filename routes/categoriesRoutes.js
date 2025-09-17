const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = Router();

router.get("/", categoriesController.getAllCategories);
router.get("/form", categoriesController.getForm);
router.post("/", categoriesController.createCategory);
router.get("/:id", categoriesController.showCategory);
router.post("/:id", categoriesController.updateCategory);
router.get("/:id/edit", categoriesController.editCategory);
router.post("/:id/delete", categoriesController.deleteCategory);

module.exports = router;
