import React from 'react';
import '../App.css';

function Navbar({ cart, toggleCart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <nav className="navbar">
      <div className="logo">Lech Lech</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/order">Orders</a>
        <button onClick={toggleCart}>
          <i className="fas fa-shopping-cart"></i> {totalItems} items, ${totalPrice}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;