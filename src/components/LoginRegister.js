/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Remove unused ReactPlayer import
import { FaEnvelope, FaLock, FaUser, FaUserPlus, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginRegister.css';
// Remove this import
// import backgroundImg from '../assets/aristocats.jpg';

const LoginRegister = () => {
  // Add these state declarations at the top
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  
  // Add checkCriteria function here
  // Update the checkCriteria function at the top of the component
  const checkCriteria = (password) => {
    return {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      'special characters': /[!@#$%^&*(),.?":{}|<>]/.test(password), // Changed label from 'special' to 'special characters'
      length: password.length >= 6
    };
  };
  const checkPasswordStrength = (password) => {
    if (!password) return '';
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    if (length < 6) return 'weak';
    if (length >= 8 && ((hasLower && hasUpper && hasNumber) || (hasSpecial && hasNumber) || (hasLower && hasUpper && hasSpecial))) return 'strong';
    return 'medium';
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginClass, setLoginClass] = useState('login-form');
  const [registerClass, setRegisterClass] = useState('register-form');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [error, setError] = useState('');
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const adjustCardHeight = useCallback(() => {
    if (cardRef.current) {
      const activeForm = isLoginForm 
        ? cardRef.current.querySelector('.auth-form.login-form') 
        : cardRef.current.querySelector('.auth-form.register-form.slide-in');
      
      if (activeForm) {
        const formHeight = activeForm.offsetHeight;
        cardRef.current.style.height = `${formHeight + 70}px`;
      }
    }
  }, [isLoginForm]);

  const loginFunction = useCallback(() => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRegisterClass('register-form');
    setLoginClass('login-form');
    setIsLoginForm(true);
    setError('');
    setTimeout(adjustCardHeight, 500);
  }, [adjustCardHeight]);

  const registerFunction = useCallback(() => {
    setUsername('');
    setEmail('');
    setPassword('');
    setLoginClass('login-form slide-out');
    setRegisterClass('register-form slide-in');
    setIsLoginForm(false);
    setError('');
    setTimeout(adjustCardHeight, 500);
  }, [adjustCardHeight]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
    
    if (location.pathname === '/register') {
      registerFunction();
    } else {
      loginFunction();
    }
  }, [location.pathname, loginFunction, registerFunction]);
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if there are any registered users
    if (!registeredUsers || registeredUsers.length === 0) {
      setError('No registered users found. Please register first.');
      return;
    }
    
    // Check if the user exists
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Store current user in session storage
      sessionStorage.setItem('currentUser', JSON.stringify({
        username: user.username,
        email: user.email
      }));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    
    // Check if email already exists
    if (registeredUsers.some(user => user.email === email)) {
      setError('This email is already registered. Please use another email or login.');
      return;
    }
    
    // Register the new user
    const newUser = { username, email, password };
    const updatedUsers = [...registeredUsers, newUser];
    
    // Update state and localStorage
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    // Clear form and show success message
    setError('Registration successful! Please login.');
    
    // Switch to login form
    loginFunction();
    navigate('/login');
  };

  useEffect(() => {
    adjustCardHeight();
    window.addEventListener('resize', adjustCardHeight);
    
    // Check if user is already logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser && location.pathname === '/') {
      navigate('/dashboard');
    }
    
    return () => {
      window.removeEventListener('resize', adjustCardHeight);
    };
  }, [navigate, location.pathname], loginFunction,registerFunction);

  // Handle form switch clicks
  const handleLoginClick = (e) => {
    e.preventDefault();
    loginFunction();
    navigate('/login');
  };
  
  const handleRegisterClick = (e) => {
    e.preventDefault();
    registerFunction();
    navigate('/register');
  };

  // Remove the video element and replace with a div
  return (
    <div className="app-wrapper">
      <div className="auth-container">
        <div className="auth-card" ref={cardRef}>
          <div className="header-tab">
            {isLoginForm ? "Login" : "Register"}
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          {/* LOGIN FORM */}
          <form className={`auth-form ${loginClass}`} onSubmit={handleLogin}>
            <div className="input-group">
              <input 
                type="email" 
                id="login-email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className="input-icon" />
            </div>
            
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"}
                id="login-password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="input-icon" />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <div className="forgot-password">
              <a href="#forgot">Forgot password?</a>
            </div>
            
            <button type="submit" className="auth-button">
              Sign In <FaSignInAlt />
            </button>
            
            <div className="auth-switch">
              Don't have an account? <a href="#register" onClick={handleRegisterClick} className="register-link">Register</a>
            </div>
          </form>
          
          {/* REGISTER FORM */}
          <form className={`auth-form ${registerClass}`} onSubmit={handleRegister}>
            <div className="input-group">
              <input 
                type="text" 
                id="register-username" 
                placeholder="Username" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className="input-icon" />
            </div>
            
            <div className="input-group">
              <input 
                type="email" 
                id="register-email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className="input-icon" />
            </div>
            
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"}
                id="register-password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordStrength(checkPasswordStrength(e.target.value));
                }}
              />
              <FaLock className="input-icon" />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {password && (
              <div className="password-strength">
                <div className={`strength-meter ${passwordStrength}`}></div>
                <span className="strength-text">
                  {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                </span>
              </div>
            )}
            <div className="password-criteria">
              {password && Object.entries(checkCriteria(password)).map(([criterion, isValid]) => (
                <div key={criterion} className={`criteria-item ${isValid ? 'valid' : 'invalid'}`}>
                  {isValid ? '✓' : '✗'} {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                </div>
              ))}
            </div>
            
            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to terms & conditions</label>
            </div>
            
            <button type="submit" className="auth-button">
              Sign Up <FaUserPlus />
            </button>
            
            <div className="auth-switch">
              Already have an account? <a href="#login" onClick={handleLoginClick} className="login-link">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;