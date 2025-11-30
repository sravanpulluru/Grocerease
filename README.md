# GrocerEase - Grocery Shopping Application

A modern React-based grocery shopping application with JSON Server for data management and CRUD operations.

## Features

- 🛍️ **Browse Products**: View all available grocery products
- 🔍 **Search & Filter**: Search products by name and filter by category
- 🛒 **Shopping Cart**: Add items to cart, update quantities, and manage cart items
- 💳 **Checkout**: Complete orders with shipping details
- 👨‍💼 **Admin Panel**: Full CRUD operations for product management
- 📦 **JSON Server**: RESTful API for data management

## Tech Stack

- **React 19** - Frontend framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **JSON Server** - Mock REST API server
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework

## Project Requirements Met

✅ React application  
✅ JSON Server for CRUD operations  
✅ Data fetched from external API and stored in db.json  
✅ Full CRUD operations (Create, Read, Update, Delete) in Admin panel

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd grocerease
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Option 1: Run Both Servers Together (Recommended)

This will start both the JSON server and React dev server simultaneously:

```bash
npm run dev:full
```

#### Option 2: Run Servers Separately

**Terminal 1 - Start JSON Server:**
```bash
npm run server
```
This starts the JSON server on `http://localhost:3000`

**Terminal 2 - Start React Dev Server:**
```bash
npm run dev
```
This starts the Vite dev server (usually on `http://localhost:5173`)

### Populating Database from External API

To fetch products from an external API and populate `db.json`:

```bash
npm run populate-db
```

This script:
- Fetches product data from an external API (FakeStore API)
- Transforms the data to match the application's product structure
- Updates `db.json` with the fetched products
- Preserves existing orders in the database

## Available Scripts

- `npm run dev` - Start React development server
- `npm run server` - Start JSON Server on port 3000
- `npm run dev:full` - Start both JSON Server and React dev server concurrently
- `npm run populate-db` - Fetch products from external API and update db.json
- `npm run build` - Build the React app for production
- `npm run preview` - Preview the production build

## Project Structure

```
grocerease/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartItem.jsx
│   │   └── Loader.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── Admin.jsx
│   ├── context/           # React Context providers
│   │   └── CartContext.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   └── main.jsx           # React entry point
├── scripts/
│   └── populate-db.js     # Script to fetch and populate db.json
├── db.json                # JSON Server database
├── package.json
└── vite.config.js
```

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product
- `GET /orders` - Get all orders
- `POST /orders` - Create a new order

## Usage

### For Users

1. **Browse Products**: Navigate to the Products page to see all available items
2. **Search**: Use the search bar to find specific products
3. **Filter**: Filter products by category using the dropdown
4. **Add to Cart**: Click "Add" button on any product card
5. **View Cart**: Click the Cart link in the navigation
6. **Checkout**: Proceed to checkout and enter shipping details

### For Administrators

1. Navigate to the **Admin Panel** from the navigation
2. **Create Products**: Fill out the form and click "Create Product"
3. **Update Products**: Click "Edit" on any product, modify the form, and click "Update Product"
4. **Delete Products**: Click "Delete" on any product (with confirmation)

## Data Flow

1. **Initial Setup**: Products are stored in `db.json`
2. **API Population**: Run `npm run populate-db` to fetch from external API
3. **JSON Server**: Serves data from `db.json` via REST API
4. **React App**: Fetches data from JSON Server and displays it
5. **CRUD Operations**: Admin panel performs Create, Read, Update, Delete operations via JSON Server

## Notes

- Make sure JSON Server is running before using the application
- The cart is stored in browser localStorage
- Orders are saved to JSON Server when checkout is completed
- Product images are loaded from external URLs (Unsplash)

## License

This project is for educational purposes.
