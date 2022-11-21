import React, { useContext, useEffect, useState } from 'react';
import Item from '../components/Item';
import Loading from '../components/Loading';
import MainContext from '../components/MainContext';

function Items() {
  const [loading, setLoading] = useState(true);
  const { socket, items, setItems } = useContext(MainContext);

  useEffect(() => {
    socket.emit('items');
    socket.on('items', (data) => {
      console.log('got items ===', data);
      setItems(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else
    return (
      <div className='items__container fitVH'>
        {items.map((x) => (
          <Item
            key={x._id}
            id={x._id}
            photo={x.photo}
            title={x.title}
            bids={x.bids}
            date={x.date}
          />
        ))}
      </div>
    );
}

export default Items;
