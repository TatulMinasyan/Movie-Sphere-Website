import './App.css';
import Home from './Pages/Home/Home'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';

export default function App() { 

  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isLoginPage = location.pathname.includes('/login');

      if (user) {
        console.log("Logged In");
        if (isLoginPage) {
          navigate('/');
        }
      } else {
        console.log("Logged Out");
        if (!isLoginPage) {
          navigate('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
}