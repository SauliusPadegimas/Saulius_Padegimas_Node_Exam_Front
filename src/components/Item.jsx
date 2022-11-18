function Item(props) {
  return (
    <div className='items__card'>
      <img src={props.photo} alt='nuotrauka' className='items__photo' />
      <h4 className='heading-quaternary'>{props.title}</h4>
      <p>Price: {props.bids[0].price}</p>
      <p>Bids: {props.bids.length}</p>
      <button className='btn btn--white'>Statyt</button>
    </div>
  );
}

export default Item;
