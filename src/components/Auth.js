import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import '../styles/Styles.css';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const tokenData = JSON.parse(token);
      const isValid = new Date(tokenData.expiry) > new Date();
      setIsAuthenticated(isValid);
      if (!isValid) {
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const login = (password) => {
    if (password.toLowerCase() === 'ernie') {
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 24);
      localStorage.setItem('authToken', JSON.stringify({
        expiry: expiry.toISOString()
      }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">ENTER PASSWORD</div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            autoComplete="new-password"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children ? children : <Outlet />;
};
