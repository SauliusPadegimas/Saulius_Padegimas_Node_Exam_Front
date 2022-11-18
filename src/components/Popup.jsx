import { useContext, useRef } from 'react';
import MainContext from './MainContext';
import { Link } from 'react-router-dom';

function Popup() {
  const { user, socket } = useContext(MainContext);

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
    socket.emit('addItem', item);
  }
  return (
    <div className='popup'>
      <div className='popup__box'>
        <Link to='/'>
          <div className='popup__close'>&times;</div>
        </Link>
        <h2 className='header-secondary'>Pridėkite prekę į aukcioną</h2>
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
          <label htmlFor='itemPrice' className='login__label'>
            Pradinė kaina, €
          </label>
          <input
            type='number'
            ref={priceRef}
            id='itemPrice'
            step='0.01'
            placeholder='0.00'
            className='login__input'
          />
          <label htmlFor='itemDate' className='login__label'>
            Aukciono pabaiga
          </label>
          <input type='datetime-local' ref={dateRef} id='itemDate' className='login__input' />
          <input type='submit' className='btn btn--shadow' value='Siųsti' />
        </form>
      </div>
    </div>
  );
}

export default Popup;
