const knex = require("knex")(require("../knexfile"));

const getAll = async (_req, res) => {
  try {
    const data = await knex("inventories");

    if (data.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
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

const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedInventoryItem = await knex("/:id")
      .where({ id: id })
      .del();

    if (deletedInventoryItem === 0) {
      return res.status(404).send({
        message: `Inventory Item with ID ${id} not found.`,
      });
    }

    res.status(204).sendStaus();
  } catch (error) {
    res.status(500).send({
      message: "Error deleting the Inventory Item.",
      error: error.message,
    });
  }
};

const addOne = async (req, res) => {
  try {
    let { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    const now = new Date();

    const created_at = now;
    const updated_at = now;

    if (status === "Out of Stock"){
      quantity = 0;
    }

    if (!warehouse_id){
      warehouse_id = 1;
    }

    const [newInventoryId] = await knex("inventories").insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
      created_at,
      updated_at,
    });
    res.status(201).json({
      message: "Item added successfully.",
      inventoryId: newInventoryId,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error adding the item.",
      error: error.message,
    });
  }
};

const validateInventory = (req, res, next) => {
  let { warehouse_id, item_name, description, category, status, quantity } =
    req.body;
  const errors = {};

  if (!item_name) errors.item_name = "Item name is required.";


  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  getAll,
  findOne,
  deleteOne,
  addOne,
  validateInventory
};
