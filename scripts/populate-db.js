/**
 * Script to fetch product data from an external API and populate db.json
 * This demonstrates fetching data from an API and storing it in JSON server
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// External API endpoint (using a free grocery products API or mock data)
// For demonstration, we'll use a mock API or fetch from a real grocery API
const EXTERNAL_API_URL = 'https://fakestoreapi.com/products';

async function fetchProductsFromAPI() {
  try {
    console.log('Fetching products from external API...');
    console.log(`API URL: ${EXTERNAL_API_URL}`);
    
    // Fetch from external API
    const response = await fetch(EXTERNAL_API_URL, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiProducts = await response.json();
    console.log(`✅ Fetched ${apiProducts.length} products from API`);
    
    // Transform API data to match our product structure
    const transformedProducts = apiProducts.slice(0, 15).map((product, index) => {
      // Map categories from API to our categories
      const categoryMap = {
        "men's clothing": "Personal Care",
        "women's clothing": "Personal Care",
        "electronics": "Household",
        "jewelery": "Others"
      };
      
      const categories = ["Fruits", "Vegetables", "Dairy", "Bakery", "Beverages", "Snacks", "Household", "Personal Care", "Others"];
      const category = categoryMap[product.category] || categories[index % categories.length];
      
      return {
        id: index + 1,
        name: product.title.substring(0, 50), // Limit title length
        quantity: "1 unit",
        category: category,
        price: Math.round(product.price * 80), // Convert USD to INR (approximate)
        image: product.image,
        description: product.description || ""
      };
    });
    
    // Read existing db.json to preserve orders
    const dbPath = path.join(__dirname, '..', 'db.json');
    let existingData = { products: [], orders: [] };
    
    if (fs.existsSync(dbPath)) {
      const existingContent = fs.readFileSync(dbPath, 'utf8');
      existingData = JSON.parse(existingContent);
    }
    
    // Update products while preserving orders
    const updatedData = {
      products: transformedProducts,
      orders: existingData.orders || []
    };
    
    // Write to db.json
    fs.writeFileSync(dbPath, JSON.stringify(updatedData, null, 2));
    
    console.log(`✅ Successfully populated db.json with ${transformedProducts.length} products from external API`);
    console.log('📦 Products fetched and stored in db.json');
    
    return transformedProducts;
  } catch (error) {
    console.error('❌ Error fetching from external API:', error.message);
    console.log('📝 Using fallback: keeping existing products in db.json');
    
    // If API fails, keep existing products
    const dbPath = path.join(__dirname, '..', 'db.json');
    if (fs.existsSync(dbPath)) {
      const existingContent = fs.readFileSync(dbPath, 'utf8');
      const existingData = JSON.parse(existingContent);
      console.log(`✅ Using existing ${existingData.products.length} products from db.json`);
      return existingData.products;
    }
    
    throw error;
  }
}

// Run the script
fetchProductsFromAPI()
  .then(() => {
    console.log('✨ Database population complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });

