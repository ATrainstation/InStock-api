const express = require('express');
const cors = require('cors')
const warehousesRoute = require('./routes/warehouses-routes.js')

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())


const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/warehouses", warehousesRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});