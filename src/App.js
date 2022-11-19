import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import AddItem from './pages/AddItem';
import Bidding from './pages/Bidding';
import Items from './pages/Items';
import MainContext from './components/MainContext';
import Home from './pages/Home';
import Login from './pages/Login';

const socket = io.connect('http://localhost:4000');

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [timeNow, setTimeNow] = useState(new Date().getTime());

  const states = {
    socket,
    user,
    setUser,
    items,
    setItems,
    timeNow,
  };

  // laika perskaiciuoja kas sekunde, todel kas sekunde atsinaujina likes laikas prie visu prekiu
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Home />}>
          <Route index element={<Items />} />
          <Route path=':id' element={<Bidding />} />
          <Route path='add' element={<AddItem />} />
        </Route>
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
