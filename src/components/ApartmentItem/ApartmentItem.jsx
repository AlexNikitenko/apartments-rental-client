import './ApartmentItem.css';

export const ApartmentItem = ({ apartment }) => (
  <div className="card ApartmentItem">
    <header className="card-header">
      <p className="card-header-title">
        {apartment.name}
      </p>
    </header>
    <div className="card-content">
      <div className="content">
        <ul>
          <li>Rooms: {apartment.rooms}</li>
          <li>Price: {apartment.price} $</li>
          <li>Description: {apartment.description}</li>
        </ul>
      </div>
    </div>
    <footer className="card-footer">
      <div className="card-footer-item">
        <button className="button is-success">Edit</button>
      </div>
      <div className="card-footer-item">
        <button className="button is-danger">Delete</button>
      </div>
    </footer>
  </div>
);