const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController");

const router = Router();

router.get("/", instrumentsController.getAllInstruments);
router.get("/form", instrumentsController.getForm);
router.post("/", instrumentsController.createInstrument);
router.get("/:id", instrumentsController.showInstrument);
router.post("/:id", instrumentsController.updateInstrument);
router.get("/:id/edit", instrumentsController.editInstrument);
router.post("/:id/delete", instrumentsController.deleteInstrument);

module.exports = router;
