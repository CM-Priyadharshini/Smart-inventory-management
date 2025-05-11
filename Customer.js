import React, { useState, useEffect } from 'react';

const CustomerPage = () => {
  const [products, setProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [purchaseQuantities, setPurchaseQuantities] = useState({});
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handlePurchaseQtyChange = (productId, qty) => {
    setPurchaseQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const handlePurchase = (productId, purchaseQty) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.quantity - purchaseQty;
        return { ...product, quantity: newQuantity >= 0 ? newQuantity : 0 };
      }
      return product;
    });

    const purchasedProduct = products.find((p) => p.id === productId);
    if (purchasedProduct) {
      const existingProduct = purchasedProducts.find((p) => p.id === productId);
      if (existingProduct) {
        setPurchasedProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity + purchaseQty } : p
          )
        );
      } else {
        setPurchasedProducts((prev) => [
          ...prev,
          { ...purchasedProduct, quantity: purchaseQty }
        ]);
      }

      const totalAmount = purchasedProduct.price * purchaseQty;
      setTotalPurchaseAmount((prev) => prev + totalAmount);
    }

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transaction Page</h2>

      <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Available</th>
            <th>Price (₹)</th>
            <th>Purchase Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={purchaseQuantities[product.id] || 1}
                  onChange={(e) =>
                    handlePurchaseQtyChange(product.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    handlePurchase(product.id, purchaseQuantities[product.id] || 1)
                  }
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Purchased Items:</h3>
      <ul>
        {purchasedProducts.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
          </li>
        ))}
      </ul>

      <h3>Total Purchase Amount: ₹{totalPurchaseAmount}</h3>
    </div>
  );
};

export default CustomerPage;
