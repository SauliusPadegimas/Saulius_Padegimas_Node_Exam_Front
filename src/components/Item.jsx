import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from './MainContext';
import Timer from './Timer';

function Item(props) {
  const [over, setOver] = useState(false);
  const { timeNow } = useContext(MainContext);
  const nav = useNavigate();

  function openItem() {
    const url = `/${props.id}`;
    nav(url);
  }

  useEffect(() => {
    let endTime = new Date(props.date).getTime();
    const timeLeft = endTime - timeNow;
    if (timeLeft <= 0) {
      setOver(true);
    }
  }, [timeNow]);

  return (
    <div className='card'>
      <div className='card__photo-container'>
        <img src={props.photo} alt='nuotrauka' className='card__photo' />
      </div>
      <div className='card__bottom'>
        <h4 className='heading-quaternary'>{props.title}</h4>
        <h3 className='heading-tertiary'>
          {over ? `Laimėtojas ${props.bids[0].user}` : <Timer endDate={props.date} />}
        </h3>
        <div className='card__info'>
          <div>
            <p className='card__text'>Kaina: {props.bids[0].price} €</p>
            <p className='card__text'>Bids: {props.bids.length}</p>
          </div>
          <button
            className={`btn btn--shadow ${over ? 'btn--grey' : 'btn--white'}`}
            onClick={openItem}
          >
            {over ? 'Istorija' : 'Bid'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
