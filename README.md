# Fele Fashions - Backend API

A REST API service for a product listing application built with **Node.js**, **Express.js**, and **MongoDB Atlas**.

##  Features

- ✅ List product categories
- ✅ List products by category
- ✅ Add new products
- ✅ API key authentication
- ✅ Real-time MongoDB data storage
- ✅ MVC architecture
- ✅ Ready for Render deployment

## 🛠️ Tech Stack

- **Runtime:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** API Key-based
- **Hosting:** Render

##  Project Structure

```
fele-fashions-backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── productController.js # Business logic for product APIs
├── middleware/
│   └── auth.js              # API key authentication middleware
├── models/
│   ├── Category.js          # Category schema
│   └── Product.js           # Product schema
├── routes/
│   └── productRoutes.js     # API route definitions
├── scripts/
│   └── seedData.js          # Database seeding script
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── server.js                # Application entry point
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-fele
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your MongoDB Atlas connection string:
   ```env
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/product
```

### Authentication
All endpoints require the following header:
```
x-api-key: abcd-efgh-ijlk-1234
content-type: application/json
```

---

### 1. Get All Categories

**Endpoint:** `GET /api/product/categories`

**Headers:**
```json
{
  "x-api-key": "abcd-efgh-ijlk-1234",
  "content-type": "application/json"
}
```

**Response:** `200 OK`
```json
{
  "totalCategories": 4,
  "categories": [
    {
      "categoryId": 1,
      "categoryName": "Footwear"
    },
    {
      "categoryId": 2,
      "categoryName": "T-Shirts"
    },
    {
      "categoryId": 3,
      "categoryName": "Jackets"
    },
    {
      "categoryId": 4,
      "categoryName": "Jeans"
    }
  ]
}
```

---

### 2. Get Products by Category

**Endpoint:** `GET /api/product/list?categoryId=1`

**Headers:**
```json
{
  "x-api-key": "abcd-efgh-ijlk-1234",
  "content-type": "application/json"
}
```

**Query Parameters:**
- `categoryId` (required): Integer - The category ID

**Response:** `200 OK`
```json
{
  "categoryId": 1,
  "categoryName": "Footwear",
  "products": [
    {
      "productId": 11,
      "productName": "Jack and Jones Leather boots",
      "price": 4999,
      "productImage": "https://m.media-amazon.com/images/I/71ZLToAJrYL._AC_UY1000_.jpg",
      "brand": "Jack and Jones"
    },
    {
      "productId": 12,
      "productName": "Nike Air Jordans",
      "price": 8999,
      "productImage": "https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/89c121fc-3d07-4de0-aef6-bcc9c2764a2c/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design.jpg",
      "brand": "Nike"
    }
  ]
}
```

---

### 3. Add New Product

**Endpoint:** `POST /api/product/save`

**Headers:**
```json
{
  "x-api-key": "abcd-efgh-ijlk-1234",
  "content-type": "application/json"
}
```

**Request Body:**
```json
{
  "productName": "Jack and Jones Leather boots",
  "price": 4999,
  "productImage": "https://m.media-amazon.com/images/I/71ZLToAJrYL._AC_UY1000_.jpg",
  "brand": "Jack and Jones",
  "categoryId": 1
}
```

**Response:** `201 Created`
```json
{
  "message": "Product saved successfully"
}
```

---

### Error Responses

**401 Unauthorized** - Missing or invalid API key
```json
{
  "error": "Unauthorized",
  "message": "API key is missing"
}
```

**400 Bad Request** - Missing required fields
```json
{
  "error": "Bad Request",
  "message": "All fields are required: productName, price, productImage, brand, categoryId"
}
```

**404 Not Found** - Category not found
```json
{
  "error": "Not Found",
  "message": "Category not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal Server Error",
  "message": "Failed to fetch categories"
}
```

##  Database Schema

### Category Model
```javascript
{
  categoryId: Number (unique, required),
  categoryName: String (required)
}
```

### Product Model
```javascript
{
  productId: Number (unique, required, auto-incremented),
  productName: String (required),
  price: Number (required, min: 0),
  productImage: String (required),
  brand: String (required),
  categoryId: Number (required, ref: Category)
}
```

## 📦 Sample Data

The database comes pre-seeded with:
- **4 Categories:** Footwear, T-Shirts, Jackets, Jeans
- **20 Products:** 5 products in each category

## 🌐 Deployment to Render

### Step 1: Prepare MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0 is sufficient)
3. Create a database user with username and password
4. Whitelist IP: `0.0.0.0/0` (allow access from anywhere)
5. Get your connection string (should look like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>?retryWrites=true&w=majority
   ```

### Step 2: Deploy to Render

1. **Create a Render account** at [https://render.com](https://render.com)

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **Create a new Web Service on Render**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name:** `fele-fashions-api`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** Free

4. **Add Environment Variables**
   
   In Render dashboard, go to "Environment" and add:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fele-fashions?retryWrites=true&w=majority
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Once deployed, you'll get a URL like: `https://fele-fashions-api.onrender.com`

6. **Seed the Database**
   
   After deployment, run the seed script once using Render's shell:
   - Go to your service dashboard
   - Click "Shell" tab
   - Run: `npm run seed`

### Step 3: Test Your API

Your API will be available at:
```
https://fele-fashions-api.onrender.com/api/product/categories
```

Example cURL request:
```bash
curl -X GET https://fele-fashions-api.onrender.com/api/product/categories \
  -H "x-api-key: abcd-efgh-ijlk-1234" \
  -H "content-type: application/json"
```

##  Testing the API

### Using cURL

**Get Categories:**
```bash
curl -X GET http://localhost:3000/api/product/categories \
  -H "x-api-key: abcd-efgh-ijlk-1234" \
  -H "content-type: application/json"
```

**Get Products by Category:**
```bash
curl -X GET "http://localhost:3000/api/product/list?categoryId=1" \
  -H "x-api-key: abcd-efgh-ijlk-1234" \
  -H "content-type: application/json"
```

**Add New Product:**
```bash
curl -X POST http://localhost:3000/api/product/save \
  -H "x-api-key: abcd-efgh-ijlk-1234" \
  -H "content-type: application/json" \
  -d '{
    "productName": "New Product",
    "price": 2999,
    "productImage": "https://example.com/image.jpg",
    "brand": "Brand Name",
    "categoryId": 1
  }'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set header: `x-api-key: abcd-efgh-ijlk-1234`
3. Test all three endpoints

##  Security Notes

- The API key (`abcd-efgh-ijlk-1234`) is hardcoded for demonstration purposes
- In production, consider:
  - Storing API keys in environment variables
  - Implementing JWT-based authentication
  - Using rate limiting
  - Adding input validation and sanitization

##  Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Seed the database with sample data

##  Support

For issues or questions, please contact the development team.

##  License

ISC

---

**Built with  for Fele Fashions**
#   f e l e - f a s h i o n s  
 