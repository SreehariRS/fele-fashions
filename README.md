# Fele Fashions - Backend API

REST API for product listing application with Node.js, Express.js, and MongoDB Atlas.

🌐 **Live Demo:** [https://fele-fashions-api.onrender.com](https://fele-fashions-api.onrender.com)

##  Tech Stack

**Node.js 16+ | Express.js | MongoDB Atlas | MVC Architecture**

##  Project Structure

```
task-fele/
├── models/          # MongoDB schemas (Category, Product)
├── controllers/     # Business logic
├── routes/          # API endpoints
├── middleware/      # Authentication
├── config/          # Database connection
└── server.js        # Entry point
```

##  Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env
# Edit .env and add your MongoDB Atlas URI

# 3. Seed database
npm run seed

# 4. Start server
npm start
```

Server runs on `http://localhost:3000`

##  API Endpoints

**Base URL (Local):** `http://localhost:3000/api/product`

**Base URL (Production):** `https://fele-fashions-api.onrender.com/api/product`

**Authentication:** All endpoints require header `x-api-key: abcd-efgh-ijlk-1234`

### 1. GET /categories
Returns all product categories.

**Response:**
```json
{
  "totalCategories": 4,
  "categories": [
    { "categoryId": 1, "categoryName": "Footwear" },
    { "categoryId": 2, "categoryName": "T-Shirts" }
  ]
}
```

### 2. GET /list?categoryId={id}
Returns products for a specific category.

**Response:**
```json
{
  "categoryId": 1,
  "categoryName": "Footwear",
  "products": [
    {
      "productId": 11,
      "productName": "Jack and Jones Leather boots",
      "price": 4999,
      "productImage": "https://...",
      "brand": "Jack and Jones"
    }
  ]
}
```

### 3. POST /save
Adds a new product.

**Request Body:**
```json
{
  "productName": "Product Name",
  "price": 4999,
  "productImage": "https://...",
  "brand": "Brand Name",
  "categoryId": 1
}
```

**Response:** `{"message": "Product saved successfully"}`

##  Error Responses

- **401** - Missing/invalid API key
- **400** - Missing required fields
- **404** - Category not found
- **500** - Server error

##  Database Schema

**Category:** `categoryId (Number), categoryName (String)`

**Product:** `productId (Number), productName (String), price (Number), productImage (String), brand (String), categoryId (Number)`

**Sample Data:** 4 categories, 20 products (5 per category)

## 🌐 Deploy to Render

### MongoDB Atlas Setup
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster (free M0 tier)
3. Create database user
4. Whitelist IP: `0.0.0.0/0`
5. Get connection string


## 🧪 Testing

### Production API (Live)
```bash
curl -H "x-api-key: abcd-efgh-ijlk-1234" https://fele-fashions-api.onrender.com/api/product/categories
```

### Postman (Recommended)
1. Create GET request: `http://localhost:3000/api/product/categories`
2. Add header: `x-api-key: abcd-efgh-ijlk-1234`
3. Send request

### Local Testing
```bash
curl -H "x-api-key: abcd-efgh-ijlk-1234" http://localhost:3000/api/product/categories
```

---

**Built for Fele Fashions** | Node.js + Express + MongoDB
