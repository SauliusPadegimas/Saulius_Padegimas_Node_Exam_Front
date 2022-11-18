import React, { useContext, useEffect } from 'react';
import Item from './Item';
import MainContext from './MainContext';

function Items() {
  const { socket, items, setItems } = useContext(MainContext);

  useEffect(() => {
    socket.emit('items');
    socket.on('items', (data) => {
      console.log('got items ===', data);
      setItems(data);
    });
    console.log('veikia use efektas');
  }, []);
  return (
    <div className='items__container'>
      {items.map((x) => (
        <Item key={x._id} photo={x.photo} title={x.title} bids={x.bids} />
      ))}
    </div>
  );
}

export default Items;
