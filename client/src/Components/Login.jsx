import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInputs, setShowInputs] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        const userData = { username: data.user };
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
        alert(data.msg);
        navigate('/');
      } else {
        alert(data.error);
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during Login:', error);
    }
  };

  // Define variants for the main login component entrance animation
  const componentVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Define variants for input fields entrance animation
  const inputVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  // Define variants for the button entrance animation
  const buttonVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  // Effect to set showInputs to true after the component animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInputs(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="login-container"
      variants={componentVariant}
      initial="hidden"
      animate="visible"
    >
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <motion.label 
            htmlFor="email" 
            className="form-label" 
            variants={inputVariant}
            initial="hidden"
            animate={showInputs ? "visible" : "hidden"}
            custom={0}
          >
            Email
          </motion.label>
          {showInputs && (
            <motion.input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variants={inputVariant}
              initial="hidden"
              animate="visible"
              custom={0}
            />
          )}
        </div>
        <div className="form-group">
          <motion.label 
            htmlFor="password" 
            className="form-label" 
            variants={inputVariant}
            initial="hidden"
            animate={showInputs ? "visible" : "hidden"}
            custom={1}
          >
            Password
          </motion.label>
          {showInputs && (
            <motion.input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variants={inputVariant}
              initial="hidden"
              animate="visible"
              custom={1}
            />
          )}
        </div>
        {showInputs && (
          <motion.button 
            type="submit" 
            className="form-button" 
            variants={inputVariant}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            Login
          </motion.button>
        )}
      </form>
      <p className="redirect-text">
        Not registered yet? <Link to="/signup" className="redirect-link">Sign Up</Link>
      </p>
    </motion.div>
  );
};

export default Login;
