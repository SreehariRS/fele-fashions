const Category = require('../models/Category');
const Product = require('../models/Product');

//Get all product categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('-_id categoryId categoryName').sort({ categoryId: 1 });
    
    res.json({
      totalCategories: categories.length,
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch categories'
    });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'categoryId is required'
      });
    }

    const category = await Category.findOne({ categoryId: parseInt(categoryId) });
    
    if (!category) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Category not found'
      });
    }

    const products = await Product.find({ categoryId: parseInt(categoryId) })
      .select('-_id productId productName price productImage brand')
      .sort({ productId: 1 });

    res.json({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      products: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch products'
    });
  }
};

// Save a new product
const saveProduct = async (req, res) => {
  try {
    const { productName, price, productImage, brand, categoryId } = req.body;

    if (!productName || !price || !productImage || !brand || !categoryId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'All fields are required: productName, price, productImage, brand, categoryId'
      });
    }

    const category = await Category.findOne({ categoryId: parseInt(categoryId) });
    if (!category) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Category not found'
      });
    }

    const lastProduct = await Product.findOne().sort({ productId: -1 });
    const newProductId = lastProduct ? lastProduct.productId + 1 : 1;

    const newProduct = new Product({
      productId: newProductId,
      productName,
      price,
      productImage,
      brand,
      categoryId: parseInt(categoryId)
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product saved successfully'
    });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to save product'
    });
  }
};

module.exports = {
  getCategories,
  getProductsByCategory,
  saveProduct
};
