import React, { useContext, useEffect } from 'react';
import Item from '../components/Item';
import MainContext from '../components/MainContext';

function Items() {
  const { socket, items, setItems } = useContext(MainContext);

  useEffect(() => {
    socket.emit('items');
    socket.on('items', (data) => {
      console.log('got items ===', data);
      setItems(data);
    });
  }, []);
  return (
    <div className='items__container fitVH'>
      {items.map((x) => (
        <Item key={x._id} id={x._id} photo={x.photo} title={x.title} bids={x.bids} date={x.date} />
      ))}
    </div>
  );
}

export default Items;
