import { Loader } from '../Loader';
import { Error } from '../Error';
import { ApartmentForm } from '../ApartmentForm';
import { useState } from 'react';
import { addApartment } from '../../api';

export const AddModal = ({ onAdd, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rooms: '',
    price: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    rooms: '',
    price: '',
  });

  const handleConfirm = async () => {
    try {
      setError(null);
      setFormErrors({
        name: '',
        description: '',
        rooms: '',
        price: '',
      });
      setIsLoading(true);
      const response = await addApartment({
        name: formData.name,
        description: formData.description,
        rooms: +formData.rooms,
        price: +formData.price
      });

      if (response.data.errors) {
        setFormErrors(response.data.errors);
      } else {
        onAdd(formData);
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          {isLoading && <Loader size="small" />}
          {error && <Error error={error} />}

          <div className="card-content">
            <ApartmentForm formData={formData} setFormData={setFormData} formErrors={formErrors} />
          </div>
          <footer className="card-footer">
            <div className="card-footer-item">
              <button onClick={handleConfirm} className="button is-success">Confirm</button>
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