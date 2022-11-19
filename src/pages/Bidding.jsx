import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Bid from '../components/Bid';
import MainContext from '../components/MainContext';
import { AiFillCloseCircle } from 'react-icons/ai';
import Timer from '../components/Timer';

function Bidding() {
  const [item, setItem] = useState(null);
  const [price, setPrice] = useState(0);
  const [errorResp, setErrorResp] = useState(null);
  const [over, setOver] = useState(false);
  let { id } = useParams();
  const { socket, timeNow } = useContext(MainContext);

  function handleChange(e) {
    setPrice(e.target.value);
  }

  function makeBid() {
    const secret = localStorage.getItem('secret');
    socket.emit('update', { secret, id, price });
  }

  useEffect(() => {
    socket.emit('items', id);
    socket.on('oneItem', (data) => {
      console.log('got one item ===', data);
      setItem(data);
      setPrice(data.bids[0].price + 1);
    });
    socket.on('errorOnUpdate', (message) => {
      if (message) {
        setErrorResp(message);
      } else setErrorResp(null);
    });
  }, []);

  useEffect(() => {
    if (item) {
      let endTime = new Date(item.date).getTime();
      const timeLeft = endTime - timeNow;
      if (timeLeft <= 0) {
        setOver(true);
      }
    }
  }, [timeNow]);

  if (!item) {
    return <h2>Loading</h2>;
  } else {
    return (
      <div className='bidding fitVH'>
        <div className='bidding__img'>
          <img src={item.photo} alt='prekes nuotrauka' />
        </div>
        <div className='bidding__info'>
          <h1 className='bidding__heading'>{item.title}</h1>
          <h2 className='heading-secondary'>
            {over ? `Pasibaigė. Laimėtojas ${item.bids[0].user}` : <Timer endDate={item.date} />}
          </h2>
          {errorResp && (
            <h4 className='heading-quaternary'>
              <AiFillCloseCircle style={{ color: 'red', marginRight: '1rem' }} />
              {errorResp}
            </h4>
          )}
          {/* kainos įvedimo formą rodo tik jeigu nesibaigė aukcionas */}
          {!over && (
            <div className='bidding__form'>
              <label htmlFor='price' className='bidding__label'>
                Siūlykite kainą
              </label>
              <input
                type='number'
                className='bidding__input'
                onChange={handleChange}
                id='price'
                value={price}
                min={item.bids[0].price + 1}
                max='99999'
              />
              <button className='btn btn--white btn--shadow' onClick={makeBid}>
                Bid
              </button>
            </div>
          )}
          <h3 className='heading-tertiary'>Statymų istorija</h3>
          <div className='bidding__history'>
            {item.bids.map((x, i) => (
              <Bid key={i} original={i === item.bids.length - 1} user={x.user} price={x.price} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Bidding;
