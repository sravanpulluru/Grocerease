import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col">
      <div className="relative overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2230%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E🛒%3C/text%3E%3C/svg%3E';
          }}
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.category}
          </span>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        {product.quantity && (
          <p className="text-sm text-gray-500 mb-2">{product.quantity}</p>
        )}
        
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-green-600">₹{product.price}</div>
              {product.quantity && (
                <div className="text-xs text-gray-400">per {product.quantity}</div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => {
                addToCart(product, 1);
              }} 
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
            >
              Add to Cart
            </button>
            <Link 
              to={`/products/${product.id}`} 
              className="px-4 py-2.5 border-2 border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
