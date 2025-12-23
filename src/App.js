import './App.css';
import Home from './Pages/Home/Home'
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player';
import { ToastContainer } from 'react-toastify';


export function App() {

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged In");
      if (window.location.pathname === '/login') {
        navigate('/');
      }
    } else {
      console.log("Logged Out");
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
    }
  });

  return () => unsubscribe();
}, [navigate]);

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


