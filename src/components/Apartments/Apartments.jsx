import './Apartments.css';
import { useEffect, useState } from 'react';
import { getApartments } from '../../api';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { ApartmentsTitle } from '../ApartmentsTitle';
import { Filter } from '../Filter';
import { ApartmentItem } from '../ApartmentItem';
import { DeleteModal } from '../DeleteModal';
import { EditModal } from '../EditModal';
import { AddModal } from '../AddModal';

export const Apartments = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [deletingApartment, setDeletingApartment] = useState(null);
  const [editingApartment, setEditingApartment] = useState(null);
  const [isAddingApartment, setIsAddingApartment] = useState(false);

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

  const handleDelete = () => {
    setDeletingApartment(null);
    fetchApartments();
  };

  const handleEdit = () => {
    setEditingApartment(null);
    fetchApartments();
  };

  const handleAdd = () => {
    setIsAddingApartment(false);
    fetchApartments();
  };

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="Apartments">
      {isLoading && <Loader />}

      <ApartmentsTitle rooms={items.length} />

      <div className="columns">
        <div className="column">
          <Filter onFilter={onFilter} />
        </div>
        <div className="column is-flex is-justify-content-flex-end">
          <button className="button is-info" onClick={() => setIsAddingApartment(true)}>Add Apartment</button>
        </div>
      </div>
      <div className="columns is-multiline">
        {items.map(apartment => (
          <div className="column is-one-third" key={apartment._id}>
            <ApartmentItem
              apartment={apartment}
              onDeleteClick={(data) => setDeletingApartment(data)}
              onEditClick={(data) => setEditingApartment(data)}
            />
          </div>
        ))}
      </div>
      {!items.length && (<div className="has-text-centered mt-6">There is no apartments available</div>)}

      {deletingApartment && (
        <DeleteModal
          apartment={deletingApartment}
          onDelete={handleDelete}
          onClose={() => setDeletingApartment(null)}
        />
      )}

      {editingApartment && (
        <EditModal
          apartment={editingApartment}
          onEdit={handleEdit}
          onClose={() => setEditingApartment(null)}
        />
      )}

      {isAddingApartment && (
        <AddModal
          onAdd={handleAdd}
          onClose={() => setIsAddingApartment(false)}
        />
      )}
    </div>
  );
};