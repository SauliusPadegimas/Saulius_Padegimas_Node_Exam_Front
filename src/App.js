import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route exact path='/' element={<h1>Items</h1>} />
      <Route path='/item/:id' element={<h1>Bidding</h1>} />
      {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
      <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
    </Routes>
  );
}

export default App;
