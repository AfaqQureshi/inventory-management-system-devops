# Inventory Management System

A full-stack Inventory Management System built with React, Node.js, Express, and MongoDB.

## Features

- Add products
- View all products
- Edit products
- Delete products with confirmation
- Search products by name
- Filter products by category
- Highlight low-stock products
- Product quantity and minimum-stock tracking
- Form validation
- API error handling
- Responsive user interface

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas

## Project Structure

```text
inventory-management/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd inventory-management
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

### 3. Frontend setup
Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/products` | Add a product |
| GET | `/products` | Get all products |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |
| GET | `/products/low-stock` | Get low-stock products |

## Product Fields

```text
name
category
price
quantity
minStock
createdAt
```

The API returns the MongoDB document identifier as `id`.

## Low Stock Logic

A product is considered low stock when:

```text
quantity <= minStock
```

Low-stock products are highlighted in the interface.

## Error Handling

The application handles:

- Missing required fields
- Negative price or quantity
- Invalid product IDs
- Product not found
- Invalid API routes
- Database/API errors

## Assumptions

- Product names and categories are entered as text.
- Price, quantity, and minimum stock cannot be negative.
- MongoDB Atlas is used as the database.
- Authentication is outside the scope of this assignment.
- The application is intended to run locally.

## Future Improvements

Possible future improvements include:

- User authentication and authorization
- Pagination for large inventories
- Product image support
- Stock history
- Dashboard analytics
- Export inventory data
- Role-based access control

## Author

Developed as a full-stack technical assignment using React, Node.js, Express, and MongoDB.
