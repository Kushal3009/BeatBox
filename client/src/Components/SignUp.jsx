import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
  
      if (data.success) {
        alert(data.msg); // Display success message
        console.log('Sign up successful');
      } else {
        alert('Sign up failed:', data.error || 'Unknown error'); // Display error message
        console.error('Sign up failed:', data.error);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  // Define variants for the main signup component entrance animation
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
      className="signup-container"
      variants={componentVariant}
      initial="hidden"
      animate="visible"
    >
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <motion.label 
            htmlFor="username" 
            className="form-label" 
            variants={inputVariant}
            initial="hidden"
            animate={showInputs ? "visible" : "hidden"}
            custom={0}
          >
            Username
          </motion.label>
          {showInputs && (
            <motion.input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            htmlFor="email" 
            className="form-label" 
            variants={inputVariant}
            initial="hidden"
            animate={showInputs ? "visible" : "hidden"}
            custom={1}
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
              custom={1}
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
            custom={2}
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
              custom={2}
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
            Sign Up
          </motion.button>
        )}
      </form>

      <p className="redirect-text">
        Already registered? <Link to="/login" className="redirect-link">Login</Link>
      </p>
    </motion.div>
  );
};

export default SignUp;
