import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import Loading from '../components/Loading';

function Login() {
  const [serverResp, setServerResp] = useState({
    error: false,
    message: null,
  });
  const [loading, setLoading] = useState(true);

  const regName = useRef();
  const regPass1 = useRef();
  const regPass2 = useRef();
  const logName = useRef();
  const logPass = useRef();

  const nav = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const resp = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: regName.current.value,
        password: regPass1.current.value,
        password2: regPass2.current.value,
      }),
    });
    const data = await resp.json();
    setServerResp(data);
    regName.current.value = '';
    regPass1.current.value = '';
    regPass2.current.value = '';
  }

  async function handleLogin(e) {
    e.preventDefault();
    const resp = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: logName.current.value,
        password: logPass.current.value,
      }),
    });
    const data = await resp.json();
    if (data.error) {
      setServerResp(data);
    } else {
      localStorage.setItem('secret', data.secret);
      nav('/');
    }
  }

  return (
    <div className='login-page'>
      <div className='bg-video'>
        <video
          className='bg-video__content'
          autoPlay
          muted
          loop
          onCanPlay={() => setLoading(false)}
        >
          <source src={'http://localhost:4000/images/video.mp4'} type='video/mp4' />
          Your browser is not supported to play this video!
        </video>
      </div>
      <h1 className='heading-primary'>Vilniaus Aukcionas</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className='login-hero'>
          <h2 className='heading-secondary'>
            Aukcionas prieinamas tik prisijungusiems vartotojams
          </h2>
          <div className='form__container'>
            <form className='form' onSubmit={handleRegister}>
              <h3 className='heading-tertiary'>Naujas vartotojas</h3>

              <label htmlFor='regName' className='login__label'>
                Vartotojo vardas
              </label>
              <input type='text' id='regName' ref={regName} className='login__input' />

              <label htmlFor='regPass1' className='login__label'>
                Slapta??odis
              </label>
              <input type='text' id='regPass1' ref={regPass1} className='login__input' />
              <label htmlFor='regPass2' className='login__label'>
                Pakartokit slapta??od??
              </label>
              <input type='text' id='regPass2' ref={regPass2} className='login__input' />
              <input type='submit' className='btn btn--white btn--shadow' value='Registruokis' />
            </form>
            <form className='form' onSubmit={handleLogin}>
              <div>
                <h3 className='heading-tertiary'>Esamas vartotojas</h3>
                <label htmlFor='logName' className='login__label'>
                  Vartotojo vardas
                </label>
                <input type='text' id='logName' ref={logName} className='login__input' />
                <label htmlFor='logPass' className='login__label'>
                  Slapta??odis
                </label>
                <input type='text' id='logPass' ref={logPass} className='login__input' />
              </div>
              <input type='submit' value='Prisijunk' className='btn btn--white btn--shadow' />
            </form>
          </div>
          {serverResp.message && (
            <div className='server-msg'>
              {/* jeigu turim klaida is serverio, tai rodom prane??im?? */}
              {serverResp.error ? (
                <AiFillCloseCircle style={{ color: 'red', marginRight: '1rem' }} />
              ) : (
                <AiFillCheckCircle style={{ color: 'green', marginRight: '1rem' }} />
              )}
              <h4 className='heading-quaternary'>{serverResp.message}</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
