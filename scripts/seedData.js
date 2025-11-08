require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

const categories = [
  { categoryId: 1, categoryName: 'Footwear' },
  { categoryId: 2, categoryName: 'T-Shirts' },
  { categoryId: 3, categoryName: 'Jackets' },
  { categoryId: 4, categoryName: 'Jeans' }
];

const products = [
  // Footwear products (categoryId: 1)
  {
    productId: 11,
    productName: 'Jack and Jones Leather boots',
    price: 4999,
    productImage: 'https://m.media-amazon.com/images/I/71ZLToAJrYL._AC_UY1000_.jpg',
    brand: 'Jack and Jones',
    categoryId: 1
  },
  {
    productId: 12,
    productName: 'Nike Air Jordans',
    price: 8999,
    productImage: 'https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/89c121fc-3d07-4de0-aef6-bcc9c2764a2c/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design.jpg',
    brand: 'Nike',
    categoryId: 1
  },
  {
    productId: 13,
    productName: 'Adidas Ultraboost Running Shoes',
    price: 7499,
    productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1e5104d60d654d9cac07ae8500e4b3c7_9366/Ultraboost_Light_Shoes_White_HQ6347_01_standard.jpg',
    brand: 'Adidas',
    categoryId: 1
  },
  {
    productId: 14,
    productName: 'Puma Suede Classic Sneakers',
    price: 3999,
    productImage: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/374915/01/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Sneakers',
    brand: 'Puma',
    categoryId: 1
  },
  {
    productId: 15,
    productName: 'Reebok Classic Leather',
    price: 5499,
    productImage: 'https://assets.reebok.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3f0c7eb14b814e73963baffe00b9c948_9366/Classic_Leather_Shoes_White_100074282_01_standard.jpg',
    brand: 'Reebok',
    categoryId: 1
  },
  
  // T-Shirts products (categoryId: 2)
  {
    productId: 21,
    productName: 'Nike Dri-FIT Running T-Shirt',
    price: 1499,
    productImage: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e1f20550-05e4-4ff0-bf6b-6b9e0c7c4bf8/dri-fit-miler-mens-running-top-3xRqNw.png',
    brand: 'Nike',
    categoryId: 2
  },
  {
    productId: 22,
    productName: 'Adidas Essentials 3-Stripes Tee',
    price: 1299,
    productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8a2c7e3e1d9d4f5c8c44ae8500e4c1e2_9366/Essentials_3-Stripes_Tee_Black_GL3735_21_model.jpg',
    brand: 'Adidas',
    categoryId: 2
  },
  {
    productId: 23,
    productName: 'Puma Active Sports T-Shirt',
    price: 999,
    productImage: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/586740/01/fnd/IND/fmt/png/Active-Sports-Poly-Tee',
    brand: 'Puma',
    categoryId: 2
  },
  {
    productId: 24,
    productName: 'Jack and Jones Printed Crew Neck',
    price: 899,
    productImage: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2060479/2017/9/14/11505387890318-JACK--JONES-Men-Tshirts-1791505387890144-1.jpg',
    brand: 'Jack and Jones',
    categoryId: 2
  },
  {
    productId: 25,
    productName: 'Reebok Workout Ready T-Shirt',
    price: 1199,
    productImage: 'https://assets.reebok.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5f5c7d8e1d9d4f5c8c44ae8500e4c1e2_9366/Workout_Ready_Tee_Black_GT7415_01_standard.jpg',
    brand: 'Reebok',
    categoryId: 2
  },
  
  // Jackets products (categoryId: 3)
  {
    productId: 31,
    productName: 'Nike Windrunner Jacket',
    price: 6999,
    productImage: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/8dc8f2a5-d7e6-4c7e-8c7f-8b9e0c7c4bf8/windrunner-mens-hooded-jacket-3xRqNw.png',
    brand: 'Nike',
    categoryId: 3
  },
  {
    productId: 32,
    productName: 'Adidas Winter Puffer Jacket',
    price: 8999,
    productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3f0c7eb14b814e73963baffe00b9c948_9366/Winter_Puffer_Jacket_Black_HZ3380_21_model.jpg',
    brand: 'Adidas',
    categoryId: 3
  },
  {
    productId: 33,
    productName: 'Jack and Jones Denim Jacket',
    price: 3999,
    productImage: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11447376/2020/2/13/8c8f2a5d-d7e6-4c7e-8c7f-8b9e0c7c4bf81581583890318-JACK--JONES-Men-Jackets-1791581583890144-1.jpg',
    brand: 'Jack and Jones',
    categoryId: 3
  },
  {
    productId: 34,
    productName: 'Puma Padded Bomber Jacket',
    price: 5499,
    productImage: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/586740/01/fnd/IND/fmt/png/Padded-Bomber-Jacket',
    brand: 'Puma',
    categoryId: 3
  },
  {
    productId: 35,
    productName: 'Reebok Outdoor Essentials Jacket',
    price: 4999,
    productImage: 'https://assets.reebok.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5f5c7d8e1d9d4f5c8c44ae8500e4c1e2_9366/Outdoor_Essentials_Jacket_Black_GS8815_01_standard.jpg',
    brand: 'Reebok',
    categoryId: 3
  },
  
  // Jeans products (categoryId: 4)
  {
    productId: 41,
    productName: 'Jack and Jones Slim Fit Jeans',
    price: 2499,
    productImage: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2060479/2017/9/14/11505387890318-JACK--JONES-Men-Jeans-1791505387890144-1.jpg',
    brand: 'Jack and Jones',
    categoryId: 4
  },
  {
    productId: 42,
    productName: "Levi's 511 Slim Fit Denim",
    price: 3499,
    productImage: 'https://lsco.scene7.com/is/image/lsco/045112536-front-pdp-lse?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840',
    brand: "Levi's",
    categoryId: 4
  },
  {
    productId: 43,
    productName: 'Wrangler Regular Fit Jeans',
    price: 1999,
    productImage: 'https://images.wrangler.com/is/image/Wrangler/W121XZ36W-HERO?$KDP-XLARGE$',
    brand: 'Wrangler',
    categoryId: 4
  },
  {
    productId: 44,
    productName: 'Pepe Jeans Skinny Fit',
    price: 2799,
    productImage: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11447376/2020/2/13/8c8f2a5d-d7e6-4c7e-8c7f-8b9e0c7c4bf81581583890318-Pepe-Jeans-Men-Jeans-1791581583890144-1.jpg',
    brand: 'Pepe Jeans',
    categoryId: 4
  },
  {
    productId: 45,
    productName: 'Diesel Tapered Fit Jeans',
    price: 4999,
    productImage: 'https://m.media-amazon.com/images/I/71ZLToAJrYL._AC_UY1000_.jpg',
    brand: 'Diesel',
    categoryId: 4
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: false
    });
    console.log(' Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log(' Cleared existing data');

    // Insert categories
    await Category.insertMany(categories);
    console.log(' Inserted categories');

    // Insert products
    await Product.insertMany(products);
    console.log(' Inserted products');

    console.log(' Database seeded successfully!');
    console.log(` Total Categories: ${categories.length}`);
    console.log(`Total Products: ${products.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
