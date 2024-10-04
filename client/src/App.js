import React, { useState, useEffect } from "react";
import Home from "./componants/Home";
import OrderPage from "./componants/OrderPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setCart(savedCart);
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  // Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};


  useEffect(() => {
    const loadProducts = () => {
      fetch("http://localhost:3001/api/products")
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json(); // Return the response body as JSON
        })
        .then(data => {
          setProducts(data); // Set the products state with the data
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    };
  
    loadProducts(); // Call the function to load products
  }, []);

  
  const handlePlaceOrder = async (order) => {
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      
      const newOrder = await response.json();
      console.log("Order placed:", newOrder);
      clearCart(); // Clear the cart after placing the order
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item._id === product._id);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />
        <Route
          path="/order"
          element={
            <OrderPage
              cart={cart}
              handlePlaceOrder={handlePlaceOrder}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;