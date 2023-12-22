// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// function Edit() {
// const {userid}= useParams();
// console.log(userid,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// const navigate= useNavigate();
// const [csrfToken,setCsrfToken]=useState('')
// const [pdata,setPdata]=useState([]);
// useEffect(() => {
//     const fetchProductDetail = async () => {

//         try {
//             const response = await fetch(`http://localhost:8000/get_product/${userid}`, {
//               method: 'GET',
//               credentials:'include',

              
//               headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrfToken,
//               },
            
//             });
        
//             if (response.ok) {
//               const data = await response.json();
//               console.log(data);
//               setPdata(data)
//               console.log(data.name)
              
//             } else {
//               console.error('Failed to add product');
              
//             }
//           } catch (error) {
//             console.error('Error:', error);
            
//           }
  
//       };
  
//       fetchProductDetail();
//     }, [userid]);

// const [productData, setProductData] = useState({
//   name: pdata.name,
//   price: pdata.price,
//   topic: pdata.topic,
//   desc: pdata.desc,
//   author: pdata.author,
//   field: pdata.field,
// });

// useEffect(() => {
//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   };

//   const csrfTokenFromCookie = getCookie('csrftoken');
//   if (csrfTokenFromCookie) {
//     setCsrfToken(csrfTokenFromCookie);
//   }
// }, []);



// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setProductData((prevData) => ({ ...prevData, [name]: value }));
// };



// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch(`http://localhost:8000/update_products/${userid}/`, {
//       method: 'POST',
//       credentials:'include',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrfToken,
//       },
//       body: JSON.stringify(productData),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
      
//     } else {
//       console.error('Failed to add product');
      
//     }
//   } catch (error) {
//     console.error('Error:', error);
    
//   }
// };






//   const handleDelete = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/delete_products/${userid}/`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any additional headers as needed
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Delete request failed');
//       }
// navigate('/')
      
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };





//   return (
//     <div>
//         <div>
//       <h1>Add Product</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Product Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={productData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

        // <div>
        //   <label htmlFor="price">Price:</label>
        //   <input
        //     type="number"
        //     id="price"
        //     name="price"
        //     value={productData.price}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div>
        //   <label htmlFor="topic">Topic:</label>
        //   <input
        //     type="text"
        //     id="topic"
        //     name="topic"
        //     value={productData.topic}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>
        
        // <div>
        //   <label htmlFor="desc">Desc:</label>
        //   <input
        //     type="text"
        //     id="desc"
        //     name="desc"
        //     value={productData.desc}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>
        // <div>
        //   <label htmlFor="author">Author:</label>
        //   <input
        //     type="text"
        //     id="author"
        //     name="author"
        //     value={productData.author}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>
        // <div>
        //   <label htmlFor="field">Field:</label>
        //   <input
        //     type="text"
        //     id="field"
        //     name="field"
        //     value={productData.field}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        

     

//         <button type="submit">Add Product</button>
//       </form>
//     </div>
      
//      <button onClick={handleDelete}></button>
//     </div>
//   );
// }

// export default Edit;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState('');
  const [pdata, setPdata] = useState({});
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    topic: '',
    desc: '',
    author: '',
    field: '',
  });

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get_product/${userid}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPdata(data);
          setProductData(data); // Set productData with fetched data
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProductDetail();
  }, [userid, csrfToken]);

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
      const response = await fetch(`http://localhost:8000/update_product/${userid}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/productDetail/${userid}`)
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/delete_product/${userid}/`, {
        method: 'DELETE',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Edit Product</h1>
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

      

          <button type="submit">Update Product</button>
        </form>
      </div>

      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
}

export default Edit;
