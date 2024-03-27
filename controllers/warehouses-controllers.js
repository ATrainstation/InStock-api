const knex = require('knex')(require('../knexfile'));


const getAll = async (_req, res) => {
    try {
      const data = await knex('warehouses');
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    }
  }

  const findOne = async (req, res) => {
    try {
      const warehousesFound = await knex("warehouses")
        .where({ id: req.params.id });
  
      if (warehousesFound.length === 0) {
        return res.status(404).json({
          message: `Warehouse with ID ${req.params.id} not found` 
        });
      }
  
      const warehousesData = warehousesFound[0];
      res.json(warehousesData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve warehouses data for warehouse with ID ${req.params.id}`,
      });
    }
  };

  const deleteOne = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedInventory = await knex('inventories')
        .where({warehouse_id: id})
        .del()

        const deletedWarehouse = await knex('warehouses')
            .where({ id: id })
            .del();

        if (deletedWarehouse === 0) {
            return res.status(404).send({
                message: `Warehouse with ID ${id} not found.`
            });
        }

        res.status(204).send({ 
            message: 'Warehouse deleted successfully.' 
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error deleting the warehouse.',
            error: error.message
        });
    }
};
  

  
  module.exports = {
    getAll,
    findOne,
    deleteOne
  }
  