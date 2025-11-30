import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";


export default function CartItem({ item }) {
const { updateQty, removeFromCart } = useContext(CartContext);


return (
<div className="flex items-center gap-4 bg-white p-4 rounded shadow-sm">
<img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
<div className="flex-1">
<h4 className="font-semibold">{item.name}</h4>
<div className="text-sm text-gray-600">₹{item.price} each</div>
</div>
<div className="flex items-center gap-2">
<input type="number" min="1" value={item.qty} onChange={(e)=> updateQty(item.id, Number(e.target.value))} className="w-16 p-1 border rounded" />
<div className="font-semibold">₹{(item.price * item.qty).toFixed(2)}</div>
<button onClick={()=> removeFromCart(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
</div>
</div>
);
}