// import '../App.css'
// import { Link } from 'react-router-dom'
// function ProductList({product, addToCart}) {
//     function rand(){ return Math.floor(Math.random() * 90)} ;
//   return (




    
//     <div className='flex'>
//         {
//             product.map((productItem, productIndex) => {
//                 return(
//                     <div style={{width: '33%'}}>
//                         <div className='product-item'>
                        
// <img src={`https://picsum.photos/${200 + rand()}/${300 + rand()}/?random=1`} alt='webinar' width='200' height='200' />

//                             <p>{productItem.name} </p>
//                             <p>{productItem.topic}</p>
//                             <p>{productItem.field}</p>
//                             <p>{productItem.author}</p>

//                             <p>Rs. {productItem.price}</p>
                            
                          
  
//                             <button >  <Link to={`productDetail/${productItem.id}`}>Detail</Link></button>
//                         </div>
//                     </div>
//                 )
//             })
//         }
//     </div>
//   )
// }

// export default ProductList


// ProductList.js


// ProductList.js



import React from 'react';
import './css/ProductList.css'; // Import the CSS file
import { Link ,useNavigate} from 'react-router-dom';

function ProductList({ product,consise }) {
  function rand() {
    return Math.floor(Math.random() * 90);
  }
  

  const navigate = useNavigate();

  
  return (
    <div className='flex'>
      {product.map((productItem, productIndex) => {
        return (
          <div key={productIndex} className='product-item'>
            <img
              className='product-image'
              src={`https://picsum.photos/200/300/?random=${rand()}`}
              alt='webinar'
            />
            <div className='product-details'>
              <p className='product-name'>{productItem.name}</p>
              <p className='product-topic'>{productItem.topic}</p>
              <p className='product-field'>{productItem.field}</p>
              <p className='product-author'>{productItem.author}</p>
              <p className='product-price'>Rs. {productItem.price}</p>
              {/* <button ><Link to={`productDetail/${productItem.id}`}>Detail</Link></button> */}
              <button onClick={() => navigate(`/productDetail/${productItem.id}`)}>Detail</button>
               {consise &&<button onClick={() => navigate(`/edit/${productItem.id}`)}>Edit</button>}

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
