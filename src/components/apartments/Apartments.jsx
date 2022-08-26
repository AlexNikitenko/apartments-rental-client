import './Apartments.css';
import { useEffect, useState } from 'react';
import { getApartments } from '../../api';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { ApartmentsTitle } from '../ApartmentsTitle';
import { Filter } from '../Filter';

export const Apartments = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!items.length) {
      const fetchApartments = async () => {
        try {
          setIsLoading(true);
          const result = await getApartments();
          setItems(result.data);
        } catch (e) {
          setError(e);
        } finally {
          setIsLoading(false);
        }
      };

      fetchApartments();
    }
  }, [items.length]);

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Loader />;
  }

  const onFilter = async (rooms, price) => {
    const filterObj = {};
    if (rooms && rooms !== "not-selected") {
      filterObj.rooms = rooms;
    } 
    if (price && price !== "not-selected") {
      filterObj.price = price;
    } 
    const result = await getApartments(filterObj);
    return setItems(result.data);
  }

  return (
    <div className="Apartments">
      <ApartmentsTitle rooms = {items.length}/>
      <Filter onFilter={onFilter}/>
      <ul className="apartments-list">
        {items.map(apartment => {
          return (<li key={apartment._id}>
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  {apartment.name}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <ul className="apartments-info">
                    <li className="rooms-count">Rooms: {apartment.rooms}</li>
                    <li className="price">Price: {apartment.price} $</li>
                    <li className="description">Description: {apartment.description}</li>
                  </ul>
                </div>
              </div>
              <footer className="card-footer">
                <ul className="card-buttons">
                  <li>
                    <button className="button is-success">Edit</button>
                  </li>
                  <li>
                    <button className="button is-danger">Delete</button>
                  </li>
                </ul>
              </footer>
            </div>
          </li>)
        })}
      </ul>
    </div>
  );
};
