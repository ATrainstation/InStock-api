const knex = require("knex")(require("../knexfile"));

const editOne = async (req, res) => {
  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    res.json(rowsUpdated[0]);
    res.status(200);
  } catch {
    res.status(400).json({
      message: `Error updating warehouse: ${req.params.id}`,
    });
  }
};

const getAll = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`);
  }
};

const findOne = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehousesFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
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

    const deletedInventory = await knex("inventories")
      .where({ warehouse_id: id })
      .del();

    const deletedWarehouse = await knex("warehouses").where({ id: id }).del();

    if (deletedWarehouse === 0) {
      return res.status(404).send({
        message: `Warehouse with ID ${id} not found.`,
      });
    }

    res.status(204);
  } catch (error) {
    res.status(500).send({
      message: "Error deleting the warehouse.",
      error: error.message,
    });
  }
};

const validateWarehouse = (req, res, next) => {
  const { warehouseName, streetAddress, city, country, contactName, position, phoneNumber, email } = req.body;
  const errors = {};

  if (!warehouseName) errors.warehouseName = "Warehouse name is required.";

  if (email) {
    const atSymbolIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    if (atSymbolIndex <= 0 || dotIndex <= atSymbolIndex + 1 || dotIndex >= email.length - 1 || email.indexOf('@', atSymbolIndex + 1) !== -1) {
      errors.email = "Invalid email address.";
    }
  }

  if (phoneNumber) {
    const cleanNumber = phoneNumber.split('').filter(n => n >= '0' && n <= '9').join('');
    if (cleanNumber.length !== 10 || phoneNumber.length !== cleanNumber.length) {
      errors.phoneNumber = "Invalid phone number.";
    }
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  next();
};

const addOne = async (req, res) => {
  try {
    // const {
    //   warehouse_name,
    //   address,
    //   city,
    //   country,
    //   contact_name,
    //   contact_position,
    //   contact_phone,
    //   contact_email,
    //  } = req.body;

    const warehouse_name = "Willy Wonka's";
    const address = "123 Faket Street";
    const city = "The Hood";
    const country = "Banana Land";
    const contact_name = "Mohan Muruge";
    const contact_position = "Kernel";
    const contact_phone = "416-555-8767";
    const contact_email = "wonka@willys.com";

    const now = new Date();

    const created_at = now;
    const updated_at = now;

    const [newWarehouseId] = await knex("warehouses").insert({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
      created_at,
      updated_at,
    });

    res.status(201).json({
      message: "Warehouse added successfully.",
      warehouseId: newWarehouseId,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error adding the warehouse.",
      error: error.message,
    });
  }
};

const inventoryByWarehouseId = async (req, res) => {
  try {
    const id = req.params.id;
    const inventoryByWarehouseId = await knex("inventories")
    .where({ warehouse_id: id });

    if (inventoryByWarehouseId.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${id} not found`,
      });
    }
    res.status(200).json(inventoryByWarehouseId);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addOne,
  getAll,
  findOne,
  deleteOne,
  editOne,
  inventoryByWarehouseId,
  validateWarehouse
};
