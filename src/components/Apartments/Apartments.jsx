import './Apartments.css';
import { useEffect, useState } from 'react';
import { getApartments } from '../../api';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { ApartmentsTitle } from '../ApartmentsTitle';
import { Filter } from '../Filter';
import { ApartmentItem } from '../ApartmentItem';

export const Apartments = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  const fetchApartments = async (options) => {
    try {
      setIsLoading(true);
      const result = await getApartments(options);
      setItems(result.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialLoaded) {
      fetchApartments().then(() => {
        setIsInitialLoaded(true);
      })
    }
  }, [isInitialLoaded]);

  const onFilter = ({ rooms, price }) => {
    const filterObj = {};
    if (rooms) {
      filterObj.rooms = rooms;
    }
    if (price) {
      filterObj.price = price;
    }

    fetchApartments(filterObj);
  };

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="Apartments">
      {isLoading && <Loader />}

      <ApartmentsTitle rooms = {items.length}/>

      <div className="columns">
        <div className="column is-one-third">
          <Filter onFilter={onFilter} />
        </div>
        <div className="column"></div>
      </div>
      <div className="columns is-multiline">
        {items.map(apartment => (
          <div className="column is-one-third">
            <ApartmentItem key={apartment._id} apartment={apartment} />
          </div>
        ))}
      </div>
      {!items.length && (<div className="has-text-centered mt-6">There is no apartments available</div>)}
    </div>
  );
};