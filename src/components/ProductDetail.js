// ProductDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/ProductDetail.css'; // Import the CSS file

function ProductDetail() {
  const { pid } = useParams();

  // Assuming you have product data with an image URL
  const product = {
    id: 1,
    name: 'Alexa',
    price: 200,
    topic: 'This is Google Alexa. How can I help you!',
    desc: 'Later',
    field: 'Technology',
    author: 'sanjeev',
    date: '2023-12-21T11:39:03Z',
    user: 3,
    imageUrl: 'https://picsum.photos/800/400/?random', // Replace with your image URL
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">{product.name}</div>
      <img className="product-detail-image" src={product.imageUrl} alt={product.name} />
      <div className="product-detail-info">
        <p>
          <span>Price:</span> Rs. {product.price}
        </p>
        <p>
          <span>Topic:</span> {product.topic}
        </p>
        <p>
          <span>Description:</span> {product.desc}
        </p>
        <p>
          <span>Field:</span> {product.field}
        </p>
        <p className="product-detail-author">
          <span>Author:</span> {product.author}
        </p>
        <p className="product-detail-date">
          <span>Date:</span> {new Date(product.date).toLocaleString()}
        </p>
        <p className="product-detail-user">
          <span>User:</span> {product.user}
        </p>
      </div>
      <div className="product-detail-description">{product.desc}</div>
      <Link to="/" className="product-detail-back-btn">
        Back to Products
      </Link>
    </div>
  );
}

export default ProductDetail;
