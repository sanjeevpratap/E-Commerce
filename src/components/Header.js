// import '../App.css'
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import UserDetails from './Userdetail';

// function Header(props) {
// const {userdata}=props
// console.log(userdata,"fuuuuuuuuuuuuuuuuu")

//   return (
//     <div className='flex shopping-card'>
//       {/* <UserDetails updateUser={updateUserData}/> */}

//         <div onClick={()=> props.handleShow(false)} >Webinar App</div>
//         <div onClick={()=> props.handleShow(true)}> Cart
//             <sup>{props.count}</sup>
//         </div>
//         {userdata && <div><Link to="/product">Product</Link></div>}
//         {!userdata && <div><Link to="/login">Login</Link></div>}
        
//         {userdata && <div>Profile {userdata}</div>}
//     </div>
//   );
// }

// export default Header


import '../App.css';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
// import UserDetails from './Userdetail';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const { userdata } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const navigate=useNavigate()

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
  const handleLogout = async () => {

    try {
      const response = await fetch(`http://localhost:8000/logout_user`, {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.ok) {
        localStorage.setItem('isAuthenticated', JSON.stringify(false));
                localStorage.removeItem('access_token');
                alert("logout successfully ")
        navigate('/');
      } else {
        console.error('Failed to Logout');
      }
    } catch (error) {
      console.error('Error in server:', error);
    }

 
  };
  const isAuthenticatedString = localStorage.getItem('isAuthenticated');
  const isAuthenticated = isAuthenticatedString === 'true';
  return (
    <div className='flex shopping-card'>
      <div onClick={() => props.handleShow(false)}>Webinar App</div>
      {isAuthenticated && <div><Link to="/product">Product</Link></div>}
      {!isAuthenticated && <div><Link to="/login">Login</Link></div>}
      {isAuthenticated && (
        <div className="dropdown" onClick={() => setShowDropdown(!showDropdown)}>
          {userdata} :USER
          {showDropdown && (
            <ul className="dropdown-list">
              {/* Use Link to navigate to different routes */}
              <li><Link to="/appnext">My Products</Link></li>
              {/* <li><Link to="/profile">Profile</Link></li> */}
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
