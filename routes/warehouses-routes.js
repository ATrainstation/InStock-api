const router = require("express").Router();
const warehousesController = require("../controllers/warehouses-controllers.js");

router
.route("/:id")
.post(warehousesController.validateWarehouse)
.post(warehousesController.editOne);

router.get("/", warehousesController.getAll);

router.get("/:id", warehousesController.findOne);

router.delete("/:id", warehousesController.deleteOne);

router
  .route("/")
  .post(warehousesController.validateWarehouse)
  .post(warehousesController.addOne);

router.get("/:id/inventories", warehousesController.inventoryByWarehouseId);

module.exports = router;
