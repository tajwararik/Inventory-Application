const { Router } = require("express");
const brandsController = require("../controllers/brandsController");

const router = Router();

router.get("/", brandsController.getAllBrands);
router.get("/form", brandsController.getForm);
router.post("/", brandsController.createBrand);
router.get("/:id", brandsController.showBrand);
router.post("/:id", brandsController.updateBrand);
router.get("/:id/edit", brandsController.editBrand);
router.post("/:id/delete", brandsController.deleteBrand);

module.exports = router;
