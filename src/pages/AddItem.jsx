import { useContext, useRef, useState } from 'react';
import MainContext from '../components/MainContext';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

function AddItem() {
  const [errorResp, setErrorResp] = useState(null);
  const { user, socket } = useContext(MainContext);

  const nav = useNavigate();
  const titleRef = useRef();
  const photoRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();

  function sendItem(e) {
    e.preventDefault();
    const item = {
      title: titleRef.current.value,
      photo: photoRef.current.value,
      date: dateRef.current.value,
      bids: [
        {
          user,
          price: priceRef.current.value,
        },
      ],
    };
    const secret = localStorage.getItem('secret');
    socket.emit('addItem', item, secret);
    socket.on('errorOnAddItem', (message) => {
      if (message) {
        setErrorResp(message);
      } else nav('/');
    });
  }
  return (
    <div className='popup fitVH'>
      <div className='popup__box'>
        <Link to='/'>
          <div className='popup__close'>&times;</div>
        </Link>
        <h2 className='heading-secondary'>Pridėkite prekę</h2>
        {/* jeigu turim klaida is serverio, tai rodom pranešimą */}
        {errorResp && (
          <h4 className='heading-quaternary'>
            <AiFillCloseCircle style={{ color: 'red', marginRight: '1rem' }} />
            {errorResp}
          </h4>
        )}
        <form className='form' onSubmit={sendItem}>
          <label htmlFor='itemName' className='login__label'>
            Pavadinimas
          </label>
          <input type='text' ref={titleRef} id='itemName' minLength='3' className='login__input' />
          <label htmlFor='itemPhoto' className='login__label'>
            Nuotrauka
          </label>
          <input
            type='url'
            ref={photoRef}
            id='itemPhoto'
            placeholder='http://...'
            className='login__input'
          />
          <div className='label-container'>
            <label htmlFor='itemPrice' className='login__label'>
              Pradinė kaina, €
            </label>
            <label htmlFor='itemDate' className='login__label'>
              Aukciono pabaiga
            </label>
          </div>
          <div className='input-container'>
            {' '}
            <input
              type='number'
              ref={priceRef}
              id='itemPrice'
              required
              min={-9999999}
              max={9999999}
            />
            <input type='datetime-local' ref={dateRef} id='itemDate' />
          </div>
          <input
            type='submit'
            className='popup__submit btn btn--shadow btn--white'
            value='Siųsti'
          />
        </form>
      </div>
    </div>
  );
}

export default AddItem;
