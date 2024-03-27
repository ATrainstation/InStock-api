const router = require('express').Router();
const warehousesController = require('../controllers/warehouses-controllers.js');


router.route('/').get(warehousesController.getAll);


module.exports = router;
