import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem('user'); // Clear user data from local storage
        Cookies.remove("token"); // Clear token from cookies
        onLogout(); // Call the onLogout function passed as a prop
        navigate("/"); // Redirect to home after logout
      } else {
        console.error("Failed to log out. Status:", response.status);
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='w-100'>
      <nav className="navbar navbar-expand-lg custom-navbar w-100">
        <div className="container d-flex justify-content-between">
          <Link className="navbar-brand" to="/">YourMusic</Link>
          <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex search-container" id="navbarSupportedContent">
            <form className="d-flex w-75 search-form" role="search">
              <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn search-button" type="submit">Search</button>
            </form>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-center">
            {user ? (
              <>
                <Link className="profile px-3" style={{fontSize:'1rem'}} to="/profile">Welcome, {user.username}</Link>
                <button onClick={handleLogout} className='btn auth-button' style={{ borderRadius: "20px", padding: "0.4rem 1rem" }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='btn auth-button' style={{ borderRadius: "20px", padding: "0.4rem 1rem" }}>
                  Login
                </Link>
                <Link to='/signup' className='btn auth-button' style={{ borderRadius: "20px", padding: "0.4rem 1rem" }}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="navbar custom-navbar d-lg-none w-100">
        <div className="container justify-content-center">
          <form className="d-flex w-100" role="search">
            <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn search-button" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>

  );
}

export default Navbar;
