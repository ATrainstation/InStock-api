const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controllers.js');

router.delete('/inventories/:id', inventoriesController.deleteOne);

module.exports = router;