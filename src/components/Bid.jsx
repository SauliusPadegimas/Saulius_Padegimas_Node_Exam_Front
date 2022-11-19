import React from 'react';

function Bid({ user, price, original }) {
  return (
    <div className='bid'>
      <p className='bid__text'>{original ? `Pradinė kaina` : user}</p>
      <p className='bid__text'>{price} €</p>
    </div>
  );
}

export default Bid;
