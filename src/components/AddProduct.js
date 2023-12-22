// AddProduct.js

//Bad request due to user not updating
//forbidden due to automatic logout so maintain csrf,
import './css/add_product.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AddProduct = (props) => {
  const navigate=useNavigate();
  const [csrfToken,setCsrfToken]=useState('')
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    topic: '',
    desc: 'Default',
    author: 'Default',
    field: 'Default',

    
  });
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const csrfTokenFromCookie = getCookie('csrftoken');
    if (csrfTokenFromCookie) {
      setCsrfToken(csrfTokenFromCookie);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/add_product', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/')
      } else {
        console.error('Failed to add product');
        
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };




  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={productData.topic}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="desc">Desc:</label>
          <input
            type="text"
            id="desc"
            name="desc"
            value={productData.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={productData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="field">Field:</label>
          <input
            type="text"
            id="field"
            name="field"
            value={productData.field}
            onChange={handleChange}
            required
          />
        </div>

        

     

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
