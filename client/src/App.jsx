import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp"; // Assume you have this component
import Home from "./Components/Home"; // Assume you have this component
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";


function App() {
  const [user, setUser] = useState(() => {
    // Load user from local storage on initial render
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData); // Update user state on login
  };

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} /> {/* Add your SignUp component */}
          <Route path="/profile" element={<Profile />} /> {/* Add your SignUp component */}
          <Route path="/" element={<Home />} /> {/* Add your Home component */}
        </Routes>
      </Router>
  );
}

export default App;
