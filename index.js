const express = require("express");
const cors = require("cors");
const knex = require("knex");
const warehousesRoute = require("./routes/warehouses-routes.js");
const inventoriesRoute = require("./routes/inventories-routes.js");

require("dotenv").config();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);


router.use("/warehouses", warehousesRoute);
router.use("/inventories", inventoriesRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
