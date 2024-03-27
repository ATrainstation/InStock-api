const router = require('express').Router();
const warehousesController = require('../controllers/warehouses-controllers.js');


router.get('/', warehousesController.getAll);

router.get('/:id', warehousesController.findOne);

router.delete('/warehouses/:id', warehousesController.deleteOne);

module.exports = router;
