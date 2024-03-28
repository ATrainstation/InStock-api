const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controllers.js');

router.get('/', inventoriesController.getAll);

router.get('/:id', inventoriesController.findOne);

router.get('/warehouses/:id/inventories', inventoriesController.inventoryByWarehouseId);

router.delete('/inventories/:id', inventoriesController.deleteOne);

module.exports = router;