import '../App.css';
import UserDetails from './Userdetail';
import Header from './Header';
import ProductList from './ProductList';
// import CartList from './CartList';
import React, { useState, useEffect } from 'react';
function Appnext(props) {
const {consise}=props

const [csrfToken,setCsrfToken]=useState('')
const [productlist,setProductlist]=useState([])
const [userdata,setUserData]=useState('')
const [userid,setUserid]=useState(null);

const updateUserData = (newData, newId) => {
  setUserid(newId);
  setUserData(newData)
  console.log(newData, '  ///////////// ', newId);
};

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


let baseUrl = 'http://localhost:8000/product_list';


let apiUrl = consise ? `${baseUrl}/${userid}/` : baseUrl;



useEffect(()=>{
  console.log(apiUrl," ................",userid)
  const fetchData=async()=>{
  try{
      const response=await fetch(apiUrl,{
          method:'GET',
          credentials:'include',
          headers:{
              'Content-Type':'application/json',
              'X-CSRFToken': csrfToken,
          }
      });
      if(!response.ok){
          throw new Error('Request failed')
      }
      const data=await response.json()
      console.log(data,".............................")
      setProductlist(data)
      
      

  }
  catch(error)
      {console.error('Error',error)}
};
fetchData();

},[apiUrl]);

const isAuthenticatedString = localStorage.getItem('isAuthenticated');
const isAuthenticated = isAuthenticatedString === 'true';

  return (
    <>

    <div>
       {isAuthenticated && <UserDetails updateUser={updateUserData} />}
    </div>
    <div>
      <Header  userdata={userdata} ></Header>
      
      {
        
        <ProductList product={productlist}  consise={consise}></ProductList>
      }
      
    </div>
    </>
    
  );
}

export default Appnext;
