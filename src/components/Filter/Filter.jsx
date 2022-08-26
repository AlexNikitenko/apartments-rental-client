import './Filter.css';
import { useState } from 'react';

export const Filter = ({ onFilter }) => {
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();

  return (
    <div className="Filter">
      <div className="filter-wrapper">
        <button onClick={() => onFilter(rooms, price)}>Filter</button>
        <div className="rooms-selector">
          <p>Rooms Quantity:</p>
          <select onChange={(e) => setRooms(e.target.value)}>
            <option value="not-selected">Not selected</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="prices-selector">
          <p>Price:</p>
          <select onChange={(e) => setPrice(e.target.value)}>
            <option value="not-selected">Not selected</option>
            <option value="asc">lowest to highest</option>
            <option value="desc">highest to lowest</option>
          </select>
        </div>
      </div>
    </div>
  );
};