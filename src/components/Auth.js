import React, { useState,useEffect } from 'react';


import { useLocation } from 'react-router-dom';
 function Auth(props) {
    
    const location=useLocation()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [register,setRegister]=useState(false);
    const [csrfToken, setCsrfToken] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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

    const toRegister=(e)=>{
        e.preventDefault();
        setRegister(true);
    }
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            setIsButtonDisabled(true);
      
            const response = await fetch('http://localhost:8000/login_user', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({ username: username,password:password }),
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
            });
      
            if (!response.ok) {
              throw new Error('Request failed');
            }
            
            const data = await response.json();
            console.log(data);
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            
            window.location.href = `/`;
      
          } catch (error) {
            console.error('Error:', error);
      
          } finally {
            setIsButtonDisabled(false);
          }
      
    
        
    };
    const handleRegister = async (event) => {
        event.preventDefault();
        
        try {
            setIsButtonDisabled(true);
      
            const response = await fetch('http://localhost:8000/user_register', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({
                username:username,
                email:email,
                password:password
                
            }),
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
            });
      
            if (!response.ok) {
              throw new Error('Request failed');
            }
      
            const data = await response.json();
            console.log(data);
      
          } catch (error) {
            console.error('Error:', error);
      
          } finally {
            setIsButtonDisabled(false);
          }





    
        
    };

    return (

<>




        <div style={{ display: 'flex' }}>
            { !register && <div className='part'>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form id="login-form" onSubmit={handleLogin}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <button type="submit">Login</button>
                </form> 
                <button type="button" onClick={toRegister}>Register</button>
            </div>}
            
            {register && <div className='part'>
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
            }
        </div>

        </>
    );
}


export default Auth;