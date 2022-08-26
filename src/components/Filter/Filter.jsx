import { useState } from 'react';

export const Filter = ({ onFilter }) => {
  const [rooms, setRooms] = useState('');
  const [price, setPrice] = useState('');

  const handleFilter = () => {
    onFilter({ rooms, price });
  };
  const handleReset = () => {
    setRooms('');
    setPrice('');
    onFilter({ rooms: '', price: '' });
  };

  return (
    <div className="columns">
      <div className="column">
        <div className="select">
          <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
            <option value="">Select rooms</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      <div className="column">
        <div className="select">
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">Not selected</option>
            <option value="asc">Lowest to highest</option>
            <option value="desc">Highest to lowest</option>
          </select>
        </div>
      </div>

      <div className="column">
        <button className="button is-primary" onClick={handleFilter}>Filter</button>
      </div>

      <div className="column">
        {(rooms || price) && <button className="button" onClick={handleReset}>Reset</button>}
      </div>
    </div>
  );
};