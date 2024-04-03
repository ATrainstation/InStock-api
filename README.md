# InStock API Documentation

Welcome to the InStock API documentation. This guide outlines how to interact with the API endpoints for managing warehouses and inventory items.

## Getting Started

To use the InStock API, ensure you have Node.js installed on your machine. Then, set up your project by cloning the repository and installing its dependencies:

git clone <repository-url>
cd <project-directory>
npm install

Start the application with: npm run dev

The server will run on `http://localhost:3000` by default.

## API Endpoints

The API base URL is `/api`. Below are the available endpoints for managing warehouses and inventories.

### Warehouses

- **GET `/api/warehouses`**: Retrieve all warehouses.
- **GET `/api/warehouses/:id`**: Retrieve a single warehouse by its ID.
- **POST `/api/warehouses`**: Add a new warehouse. Requires a JSON body with warehouse details.
- **PUT `/api/warehouses/:id`**: Update an existing warehouse by its ID. Requires a JSON body with warehouse details to be updated.
- **DELETE `/api/warehouses/:id`**: Delete a warehouse by its ID.
- **GET `/api/warehouses/:id/inventories`**: Retrieve all inventory items for a specific warehouse.

### Inventories

- **GET `/api/inventories`**: Retrieve all inventory items.
- **GET `/api/inventories/:id`**: Retrieve a single inventory item by its ID.
- **POST `/api/inventories`**: Add a new inventory item. Requires a JSON body with inventory item details.
- **PUT `/api/inventories/:id`**: Update an existing inventory item by its ID. Requires a JSON body with inventory item details to be updated.
- **DELETE `/api/inventories/:id`**: Delete an inventory item by its ID.

## Request & Response Examples

### POST `/api/warehouses`

Request body:

```json
{
  "warehouse_name": "Central Warehouse",
  "address": "123 Warehouse Lane",
  "city": "Cityville",
  "country": "Countryland",
  "contact_name": "John Doe",
  "position": "Manager",
  "contact_phone": "1234567890",
  "email": "email@example.com"
}

Response body:
{
  "message": "Warehouse added successfully.",
  "warehouseId": 1
}

GET /api/warehouses
Response body:

[
  {
    "id": 1,
    "warehouse_name": "Central Warehouse",
    "address": "123 Warehouse Lane",
    ...
  }
]

Error Handling
The API uses standard HTTP response codes to indicate the success or failure of requests. For example:

200 OK: The request was successful.
400 Bad Request: The request was malformed or invalid.
404 Not Found: The specified resource was not found.
500 Internal Server Error: An error occurred on the server.

Security
Please ensure that your API keys and sensitive information are stored securely and not exposed in your application code.
