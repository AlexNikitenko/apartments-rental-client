import { deleteApartment } from '../../api';
import { useState } from 'react';
import { Error } from '../Error';
import { Loader } from '../Loader';

export const DeleteModal = ({ apartment, onClose, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteApartmentRequest = async () => {
    try {
      setIsLoading(true);
      await deleteApartment(apartment._id);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    await deleteApartmentRequest();
    onDelete(apartment);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          {isLoading && <Loader size="small" />}
          {error && <Error error={error} />}

          <div className="card-content">
            Are you sure you want to delete {apartment.name} apartment?
          </div>
          <footer className="card-footer">
            <div className="card-footer-item">
              <button onClick={handleDelete} className="button is-success">Confirm</button>
            </div>
            <div className="card-footer-item">
              <button onClick={onClose} className="button is-danger">Cancel</button>
            </div>
          </footer>
        </div>
      </div>
      <button onClick={onClose} className="modal-close is-large" aria-label="close"></button>
    </div>
  );
};