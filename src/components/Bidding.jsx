import React from 'react';
import { useParams } from 'react-router-dom';

function Bidding() {
  let { id } = useParams();
  return <div>Bidding id:{id}</div>;
}

export default Bidding;
