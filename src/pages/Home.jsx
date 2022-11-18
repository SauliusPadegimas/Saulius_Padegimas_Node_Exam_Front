import React, { useContext, useEffect } from 'react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import MainContext from '../components/MainContext';

function Home() {
  const { user, setUser } = useContext(MainContext);

  const nav = useNavigate();

  function logoutUser() {
    localStorage.removeItem('secret');
    nav('/login');
  }

  async function fetchUser(secret) {
    const resp = await fetch(`http://localhost:4000/api/users/${secret}`);
    const data = await resp.json();
    console.log('resp from server ===', data);
    setUser(data.username);
  }

  useEffect(() => {
    const secret = localStorage.getItem('secret');
    if (!secret) {
      return nav('/login');
    }
    fetchUser(secret);
  }, []);
  return (
    <div>
      <header className='header'>
        <div className='container header__content'>
          <div className='header__side header__side--left'>
            <Link to='/items'>
              <div className='btn btn--white'>
                <AiFillHome className='icon icon--home' />
                <div className='header__title'>Vilniaus Aukcionas</div>
              </div>
            </Link>
            <div className='btn btn--shadow plus'> Dėti prekę</div>
          </div>
          <div className='header__side header__side--right'>
            <div className='header__profile'>
              <BsFillPersonFill className='icon icon--profile' /> {user}
            </div>
            <div className='btn btn--grey' onClick={logoutUser}>
              <AiOutlineLogout className='icon icon--logout' /> Logout
            </div>
            <></>
          </div>
        </div>
      </header>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;