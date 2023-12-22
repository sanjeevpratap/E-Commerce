import React, { useState,useEffect } from 'react';
import Appnext from './components/Appnext'
import {Routes,Route} from 'react-router-dom'
import Auth from './components/Auth';
import { useLocation } from 'react-router-dom';
import UserDetails from './components/Userdetail';
import AddProduct from './components/AddProduct';
import ProductDetail from './components/ProductDetail'
import Edit from './components/edit';
 function App(props) {
    
  const [userdata,setUserdata]=useState("");
  const [userId,setUserId]=useState(0);
var userid=0;
  const location=useLocation()
  const updateUserData = (newData,newId) => {
    setUserdata(newData);
    setUserId(newId)
    userid=newId
  };
  
  const isAuthenticatedString = localStorage.getItem('isAuthenticated');
  const isAuthenticated = isAuthenticatedString === 'true';
    return (

<>

{ isAuthenticated && <UserDetails updateUser={updateUserData} />}
{userdata}
{location.pathname==='/' && <Appnext userdata={userdata} userid={userid}/>}


<Routes>

<Route path="login/" exact element={<Auth    />} />
<Route path="product/" exact element={<AddProduct userid={userid}  />} />
<Route path="productDetail/:id" exact element={<ProductDetail  />} />
<Route path="profile/:id" exact element={<ProductDetail  />} />
<Route path="appnext/" exact element={<Appnext consise={true}  />} />
{/* <Route path="edit/:id" exact element={<Edit  />} /> */}
<Route path="/edit/:userid" element={<Edit />} />





</Routes>


       
        </>
    );
}


export default App;