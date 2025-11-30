import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            <span className="text-3xl md:text-4xl">🛒</span>
            <span>GrocerEase</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-semibold transition-colors ${
                isActive("/") 
                  ? "text-green-600 border-b-2 border-green-600 pb-1" 
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-semibold transition-colors ${
                isActive("/products") 
                  ? "text-green-600 border-b-2 border-green-600 pb-1" 
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Products
            </Link>
            <Link 
              to="/admin" 
              className={`font-semibold transition-colors ${
                isActive("/admin") 
                  ? "text-green-600 border-b-2 border-green-600 pb-1" 
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Cart Link */}
          <Link 
            to="/cart" 
            className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="hidden md:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
