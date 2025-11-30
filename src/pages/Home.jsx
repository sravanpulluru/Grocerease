import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ImageCarousel from "../components/ImageCarousel";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      // Get first 4 products as trending
      setTrendingProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching products:", error);
      setTrendingProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Carousel Section */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <ImageCarousel />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose GrocerEase?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the convenience of online grocery shopping with quality products and fast delivery
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="group text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🛍️</div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">Browse Products</h3>
            <p className="text-gray-600 leading-relaxed">
              Explore our wide selection of fresh groceries, from fruits and vegetables to dairy and pantry items.
            </p>
          </div>
          <div className="group text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🔍</div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">Easy Search</h3>
            <p className="text-gray-600 leading-relaxed">
              Find exactly what you're looking for with our powerful search and filter functionality.
            </p>
          </div>
          <div className="group text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🛒</div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">Smart Cart</h3>
            <p className="text-gray-600 leading-relaxed">
              Add items to your cart, update quantities, and your cart is automatically saved for later.
            </p>
          </div>
          <div className="group text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">💳</div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">Quick Checkout</h3>
            <p className="text-gray-600 leading-relaxed">
              Complete your purchase with a simple and secure checkout process.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Trending Now
            </h2>
            <p className="text-gray-600 text-lg">
              Popular picks loved by our shoppers
            </p>
          </div>
          
          {loading ? (
            <Loader />
          ) : trendingProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg mb-4">
                No products available. Make sure JSON server is running.
              </p>
              <Link 
                to="/admin" 
                className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Go to Admin Panel
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link 
              to="/products" 
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Browse our collection of fresh groceries and get them delivered to your door
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
}
