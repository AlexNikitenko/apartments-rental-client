import './Apartments.css';
import { useEffect, useState } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Appartments() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/apartments`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [isLoaded]);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (<div className="loader">Loading...</div>);
  } else {
    return (
      <div className="Appartments">
        <div className="page-title">Available Apartments ({items.data.length})</div>
        <ul>
          {items.data.map(apartment => {
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
  }

}

export default Appartments;
