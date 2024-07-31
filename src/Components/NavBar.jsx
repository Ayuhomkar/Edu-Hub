import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../navbtn.css';
import LogoutBtn from './LogoutBtn';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'



function NavBar(props) {
    const { loginWithRedirect , logout , isAuthenticated , user} = useAuth0();
    const [cartNumber , setCartNumber] = useState(0)
    const [animate , setAnimate] =  useState(false);
    let userpic =null;
    useEffect(() => {
        const updateCartNumber = async () => {
          try {
            const data = await localStorage.getItem('cartNumber');
            setCartNumber(data || 0); // Ensure a valid number (default to 0)
          } catch (error) {
            console.error('Error fetching cart number from localStorage:', error);
          }
        };
        updateCartNumber();
        const intervalId = setInterval(updateCartNumber, 5000); // 5 seconds in milliseconds
        return () => clearInterval(intervalId);
      }, []);




      useEffect(() => {
          setAnimate(true);
          const timeout = setTimeout(() => {
            setAnimate(false);
          }, 1000); // Animation duration
          console.log(animate)
          return () => clearTimeout(timeout);
      }, [cartNumber]);





    return (
        <div className="nav">
            <div className="nav-logo">
            <i class={`ri-pencil-ruler-line text-4xl text-green-900 hover:animate-ping`}></i>
                <h3><span>Edu</span>Hub</h3>
            </div>
            <div className="nav-menu">
                <h4><Link to="/"  className='Link'>Home</Link></h4>
                <h4><Link to="/about" className='Link'>About</Link></h4>
                <h4><Link to="/Courses" className='Link'>Courses</Link></h4>
                {isAuthenticated && <h4><Link to="/Lobby" className='Link'>Doubts</Link></h4>}
                <h4><Link to="/home" className='Link'>Contact Us</Link></h4>
            </div>

            <div className="nav-search">
                <i className="ri-search-2-line"></i>
                <h4>Explore</h4>
               {isAuthenticated && <p className={`absolute text-sm top-5 bg-red-200 h-4 w-4 text-center flex flex-row items-center justify-center rounded-[50%] p-2 ${animate ? 'animate-ping' :'animate-none'}`}>{cartNumber}</p>}
                {isAuthenticated && <Link to='/myCart'><i className="ri-shopping-cart-2-line"></i></Link>}
                {isAuthenticated && <div className="userinfo"><img src={user && user.picture} alt={user.name} id='profilepic'/><Link to="/MyAccount"><p>{user.name}</p></Link></div>}
                {isAuthenticated ? (<LogoutBtn onClick={()=>{logout({ logoutParams: { returnTo: window.location.origin } });}}/>) 
                :(<button className="button" onClick={() => {loginWithRedirect();props.isLoggedIn()}}>
                    Try Now
                    <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                        <path
                            clipRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                            fillRule="evenodd"
                        ></path>
                    </svg>
            </button>)}
            </div>
        </div>
    )
}

export default NavBar