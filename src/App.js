import './App.css';
import Home from './Pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player';
import { ToastContainer } from 'react-toastify';


export function App() {
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


