import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderpage.css';

function OrderPage({ cart, handlePlaceOrder }) {
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shippingMethod: '14-day',
  });

  const navigate = useNavigate(); // Hook for navigation

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const placeOrder = async () => {
    if (!cart.length || !orderDetails.name || !orderDetails.email || !orderDetails.phone || !orderDetails.address) {
      alert('נא למלא את כל השדות ולהוסיף מוצרים לעגלה.');
      return;
    }

    const order = {
      items: cart,
      ...orderDetails,
      total: totalPrice,
    };

    await handlePlaceOrder(order);
    // setCart([]);
    // saveCartToLocalStorage([]);
    navigate('/');
  };

  return (
    <div className="order-page">
      <h2>Order Page</h2>
      <div className="order-summary">
        <h3>Product Cart Details:</h3>
        {cart.map(item => (
          <div key={item._id} className="order-item">
            <img src={`/images/${item.imageUrl}`} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>Amount: {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
          </div>
        ))}
        <h3>Total Price: ${totalPrice}</h3>
      </div>
      <div className="order-form">
        <label>
          Name:
          <input type="text" name="name" value={orderDetails.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={orderDetails.email} onChange={handleInputChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={orderDetails.phone} onChange={handleInputChange} />
        </label>
        <label>
          Shipping Address:
          <textarea name="address" value={orderDetails.address} onChange={handleInputChange} />
        </label>
        <label>
          Shipping Method:
          <select name="shippingMethod" value={orderDetails.shippingMethod} onChange={handleInputChange}>
            <option value="14-day">Free Shipping (14 Days)</option>
            <option value="3-day">Fast Delivery (3 Days)</option>
          </select>
        </label>
        <button onClick={placeOrder}>Place Order</button>
      </div>
      <button onClick={() => navigate('/')}>Back to Home</button> {/* Navigate back to Home */}
    </div>
  );
}

export default OrderPage;
