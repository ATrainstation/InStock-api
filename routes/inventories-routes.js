const router = require("express").Router();
const inventoriesController = require("../controllers/inventories-controllers.js");

router
  .route("/")
  .post(inventoriesController.validateInventory)
  .post(inventoriesController.addOne);

router.get("/", inventoriesController.getAll);

router.get("/:id", inventoriesController.findOne);

router.delete("/:id", inventoriesController.deleteOne);
router.put("/:id", inventoriesController.editOne);

module.exports = router;
