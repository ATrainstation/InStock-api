const knex = require("knex")(require("../knexfile"));

const getAll = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Inventories: ${err}`);
  }
};

const findOne = async (req, res) => {
  try {
    const inventoriesFound = await knex("inventories").where({
      id: req.params.id,
    });

    if (inventoriesFound.length === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    const inventoriesData = inventoriesFound[0];
    res.json(inventoriesData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventories data for inventory with ID ${req.params.id}`,
    });
  }
};

const inventoryByWarehouseId = async (req, res) => {
    try {
      const id = req.params.id;
      const inventoryByWarehouseId = await knex("inventories").where({
        warehouse_id: id,
      });
  
      if (inventoryByWarehouseId === 0) {
        return res.status(404).json({
          message: `Warehouse with ID ${id} not found`,
        });
      }
      res.status(200).json(inventoryByWarehouseId);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedInventoryItem = await knex("inventories")
      .where({ id: id })
      .del();

    if (deletedInventoryItem === 0) {
      return res.status(404).send({
        message: `Inventory Item with ID ${id} not found.`,
      });
    }

    res.status(204).send({
      message: "Inventory Item deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting the Inventory Item.",
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  findOne,
  inventoryByWarehouseId,
  deleteOne,
};
