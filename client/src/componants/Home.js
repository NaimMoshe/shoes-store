import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import '../App.css';

const Home = ({ products, addToCart }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility
  const navigate = useNavigate(); // Initialize navigate function

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };
  
  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setCart(savedCart);
  }, []);
  

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item._id === product._id);

    if (productIndex > -1) {
      updatedCart[productIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    
    addToCart(product);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setIsCartOpen(true); // Open cart automatically

  };

  const handlePlaceOrder = () => {
    navigate('/order'); // Navigate to OrderPage
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedCart = cart.map(item => 
      item._id === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="home">
      <Navbar cart={cart} toggleCart={() => setIsCartOpen(!isCartOpen)} />
      <header>
        <img src="/images/cover-image.jpg" alt="Cover" />
        <h1>Welcome to Lech Lech Shoe Store</h1>
        <p>Best shoes for your journey</p>
      </header>

      <ProductList products={products} addToCart={handleAddToCart} />

      <button className="toggle-cart" onClick={() => setIsCartOpen(!isCartOpen)}>
        {isCartOpen ? "Close Cart" : "Open Cart"}
      </button>

      {isCartOpen && (
        <div className="cart">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <img src={`/images/${item.imageUrl}`} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    />
                    <p>Price per unit: ${item.price}</p>
                    <p>Total: ${item.price * item.quantity}</p>
                    <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
              <h3>Total Price: ${calculateTotalPrice()}</h3>
              <button onClick={handlePlaceOrder}>Place Order</button> {/* Button to navigate to OrderPage */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;