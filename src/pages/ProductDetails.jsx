import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load product. Make sure JSON server is running.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  
  if (error || !product) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            {error || "Product not found"}
          </h2>
          <p className="text-red-600 mb-4">
            The product you're looking for doesn't exist or couldn't be loaded.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-600 hover:text-green-700 font-medium"
      >
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg"
            onError={(e) => {
              e.target.src =
                'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2230%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E🛒%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          {product.category && (
            <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
          )}
          {product.quantity && (
            <p className="text-gray-600 mb-4">Quantity: {product.quantity}</p>
          )}
          <div className="text-3xl font-bold text-green-600 mb-4">
            ₹{product.price}
          </div>
          {product.description && (
            <p className="text-gray-700 mb-6">{product.description}</p>
          )}
          <button
            onClick={() => {
              addToCart(product, 1);
              alert(`${product.name} added to cart!`);
            }}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
