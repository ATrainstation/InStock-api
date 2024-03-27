const knex = require('knex')(require('../knexfile'));

const deleteOne = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedInventoryItem = await knex('inventories')
            .where({ id: id })
            .del();

        if (deletedInventoryItem  === 0) {
            return res.status(404).send({
                message: `Inventory Item with ID ${id} not found.`
            });
        }

        res.status(204).send({ 
            message: 'Inventory Item deleted successfully.' 
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error deleting the Inventory Item.',
            error: error.message
        });
    }
};

module.exports = {
 
    deleteOne
  }