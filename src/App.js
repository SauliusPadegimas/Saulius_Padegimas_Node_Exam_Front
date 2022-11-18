import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContext from './components/MainContext';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  const states = {
    user,
    setUser,
  };

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<h1>Items</h1>} />
        <Route path='/item/:id' element={<h1>Bidding</h1>} />
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
