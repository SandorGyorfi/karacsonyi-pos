import React, { useState } from "react";
import { products } from "./data/products"; // A termékek listája
import Cart from "./components/Cart"; // Kosár komponens
import { saveTransaction } from "./services/firebase"; // Firebase tranzakció mentés

function App() {
  const [cart, setCart] = useState([]); // Kosár tartalma

  // Termék hozzáadása a kosárhoz
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Termék eltávolítása a kosárból
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Tranzakció mentése és kosár törlése
  const handleCheckout = async () => {
    await saveTransaction(cart);
    alert("Adatok mentve!");
    setCart([]); // Kosár tartalmának törlése
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Karácsonyi Vásár POS</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Termékkategóriák megjelenítése */}
        <div>
          {products.map((category) => (
            <div key={category.category} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{category.category}</h2>
              <ul>
                {category.items.map((product) => (
                  <li
                    key={product.id}
                    className="border p-2 mb-2 flex justify-between items-center"
                  >
                    <span>{product.name}</span>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => addToCart(product)}
                    >
                      Kosárba
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Kosár megjelenítése */}
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}

export default App;
