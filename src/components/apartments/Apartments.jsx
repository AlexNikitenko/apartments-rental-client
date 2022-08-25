import './Apartments.css';
import { useEffect, useState } from 'react';
import { getApartments } from '../../api';
import { Loader } from '../Loader';
import { Error } from '../Error';

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

  return (
    <div className="Apartments">
      <div className="page-title">Available Apartments ({items.length})</div>
      <ul>
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
                <button className="card-footer-item">Edit</button>
                <button className="card-footer-item">Delete</button>
              </footer>
            </div>
          </li>)
        })}
      </ul>
    </div>
  );
};
