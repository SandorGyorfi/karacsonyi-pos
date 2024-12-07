import React from "react";

const Cart = ({ cart, removeFromCart, handleCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Kosár</h2>
      <ul>
        {cart.map((item) => (
          <li
            key={item.id}
            className="border p-2 mb-2 flex justify-between items-center"
          >
            <span>
              {item.name} ({item.quantity}x)
            </span>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => removeFromCart(item.id)}
            >
              Törlés
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Végösszeg: £{total.toFixed(2)}</h3>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleCheckout}
        >
          Fizetve
        </button>
      </div>
    </div>
  );
};

export default Cart;
