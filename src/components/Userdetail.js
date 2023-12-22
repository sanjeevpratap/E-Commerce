// Your React component
import React, { useState, useEffect } from 'react';

function UserDetails(props) {
    const [userDetails, setUserDetails] = useState(null);

  useEffect(()=>{
    const fetchData=async()=>{
    try{
        const response=await fetch('http://localhost:8000/get_user_details',{
            method:'GET',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            }
        });
        if(!response.ok){
            throw new Error('Request failed')
        }
        const data=await response.json()
        console.log(data,".............................")
        props.updateUser(data.username, data.id)
        

    }
    catch(error)
        {console.error('Error',error)}
};
fetchData();

  },[]);

    return (
        <div>
            {/* <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p> */}
            {/* Add other user details as needed */}
        </div>
    );
}

export default UserDetails;
