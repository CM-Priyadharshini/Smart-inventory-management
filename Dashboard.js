import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    threshold: ''
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);

      const lowStock = parsedProducts.filter(
        (product) => product.quantity <= product.threshold
      );
      setLowStockItems(lowStock);
    }
  }, []);

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleAddNewProduct = () => {
    const newProductData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity),
      threshold: parseInt(newProduct.threshold),
      id: products.length + 1,
    };
    const updatedProducts = [...products, newProductData];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setNewProduct({ name: '', price: '', quantity: '', threshold: '' });
    setAlert({ message: 'Product added successfully!', type: 'success' });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleCustomerPage = () => {
    navigate('/customer');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Smart StockBoard</h2>
      {alert && <Alert message={alert.message} type={alert.type} />}

      <div style={{ marginBottom: '20px' }}>
        <h3>Add New Product</h3>
        <table border="1" cellPadding="10" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Threshold</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} /></td>
              <td><input type="number" name="price" value={newProduct.price} onChange={handleNewProductChange} /></td>
              <td><input type="number" name="quantity" value={newProduct.quantity} onChange={handleNewProductChange} /></td>
              <td><input type="number" name="threshold" value={newProduct.threshold} onChange={handleNewProductChange} /></td>
              <td><button onClick={handleAddNewProduct}>Add Product</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {lowStockItems.length > 0 && (
        <div style={{ margin: '20px 0' }}>
          <h3>Low Stock Alert:</h3>
          <ul>
            {lowStockItems.map((item) => (
              <li key={item.id} style={{ color: 'red', fontWeight: 'bold' }}>
                {item.name} - {item.quantity} left (Threshold: {item.threshold})
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Product List</h3>
      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Available</th>
            <th>Price (₹)</th>
            <th>Threshold</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleCustomerPage} style={{ marginTop: '20px' }}>
        Go to Transaction Page
      </button>
    </div>
  );
};

export default Dashboard;

