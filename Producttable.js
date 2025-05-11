import React from 'react';
const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table>
      <thead>   //header section
        <tr>  //row
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Threshold</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>  //table body
        {products.map((product) => (            
          <tr key={product.id}>            // mapping every single items  
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.threshold}</td>
            <td>
              <button onClick={() => onEdit(product)}>Edit</button>
              <button onClick={() => onDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
