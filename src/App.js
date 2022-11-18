import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import Bidding from './components/Bidding';
import Items from './components/Items';
import MainContext from './components/MainContext';
import Popup from './components/Popup';
import Home from './pages/Home';
import Login from './pages/Login';

const socket = io.connect('http://localhost:4000');

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  const states = {
    socket,
    user,
    setUser,
    items,
    setItems,
  };

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Home />}>
          <Route index element={<Items />} />
          <Route path=':id' element={<Bidding />} />
          <Route path='add' element={<Popup />} />
        </Route>
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
