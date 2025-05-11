import React from 'react';

const Alert = ({ message, type }) => {
  if (!message) return null;  

  return (
    <div
      style={{
        backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
        color: type === 'error' ? '#721c24' : '#155724',
        padding: '15px',
        marginBottom: '20px',
        border: '1px solid',
        borderColor: type === 'error' ? '#f5c6cb' : '#c3e6cb',
        borderRadius: '5px',
      }}
    >
      {message}
    </div>
  );
};

export default Alert;


