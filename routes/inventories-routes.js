const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controllers.js');

router.get('/', inventoriesController.getAll);

router.get('/:id', inventoriesController.findOne);

router.delete('/inventories/:id', inventoriesController.deleteOne);

module.exports = router;