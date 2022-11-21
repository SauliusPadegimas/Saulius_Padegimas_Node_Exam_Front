import React, { useContext, useEffect, useState } from 'react';
import Item from '../components/Item';
import Loading from '../components/Loading';
import MainContext from '../components/MainContext';

function Items() {
  const [loading, setLoading] = useState(true);
  const { socket, items, setItems, timeNow } = useContext(MainContext);
  const [filteredItems, setFilteredItems] = useState(items);
  const [isChecked, setIsChecked] = useState(false);
  const [query, setQuery] = useState('');

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  function handleSearch() {
    if (query.length > 0) {
      const filteredArr = items.filter((x) => {
        const name = x.title.toLowerCase();
        const search = query.toLowerCase().trim();
        if (name.includes(search)) {
          return true;
        } else return false;
      });
      return filteredArr;
    } else return items;
  }

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    if (isChecked) {
      let filteredArr = handleSearch();
      filteredArr = filteredArr.filter((x) => {
        let endTime = new Date(x.date).getTime();
        const timeLeft = endTime - timeNow;
        if (timeLeft <= 0) {
          return false;
        } else {
          return true;
        }
      });
      setFilteredItems(filteredArr);
    } else {
      let filteredArr = handleSearch();
      setFilteredItems(filteredArr);
    }
  }, [isChecked, timeNow, query]);

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
      <div className='items__page'>
        <div className='items__filter'>
          <input type='checkbox' id='endedCheck' checked={isChecked} onChange={handleCheck} />
          <label htmlFor='endedCheck' className='filter-label'>
            Tik nesibaigę
          </label>
          <br />
          <label htmlFor='searchInput' className='filter-label'>
            Paieška
          </label>
          <input
            type='search'
            id='searchInput'
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className='items__container fitVH'>
          {filteredItems.map((x) => (
            <Item
              key={x._id}
              id={x._id}
              photo={x.photo}
              title={x.title}
              bids={x.bids}
              date={x.date}
            />
          ))}
        </div>{' '}
      </div>
    );
}

export default Items;
