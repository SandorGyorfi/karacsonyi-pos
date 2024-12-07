import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase konfiguráció - Add meg itt a saját Firebase projekted adatait
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "karacsonyi-pos.firebaseapp.com",
  projectId: "karacsonyi-pos",
  storageBucket: "karacsonyi-pos.appspot.com",
  messagingSenderId: "122511161668",
  appId: "YOUR_APP_ID",
};

// Firebase alkalmazás inicializálása
const app = initializeApp(firebaseConfig);

// Firestore adatbázis inicializálása
export const db = getFirestore(app);

/**
 * Tranzakció mentése a Firestore adatbázisba
 * @param {Array} cart - A kosár tartalma
 */
export const saveTransaction = async (cart) => {
  try {
    // Végösszeg kiszámítása a kosár elemeiből
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tranzakció mentése a Firestore adatbázis `transactions` gyűjteményébe
    await addDoc(collection(db, "transactions"), {
      items: cart,
      total,
      timestamp: new Date(), // Időbélyeg
    });

    console.log("Tranzakció sikeresen mentve!");
  } catch (error) {
    console.error("Hiba történt a tranzakció mentése közben: ", error);
  }
};
