export const ApartmentForm = ({ formData, setFormData, formErrors }) => {
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: fieldValue
    }));
  };

  return (
    <div>
      <div className="field">
        <label htmlFor="name" className="label">Name</label>
        <div className="control">
          <input
            id="name"
            className="input"
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <p className="has-text-danger">{formErrors.name}</p>
      </div>

      <div className="field">
        <label htmlFor="description" className="label">Description</label>
        <div className="control">
          <input
            id="description"
            className="input"
            type="text"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <p className="has-text-danger">{formErrors.description}</p>
      </div>

      <div className="field">
        <label htmlFor="rooms" className="label">Rooms</label>
        <div className="control">
          <div className="select">
            <select id="rooms" name="rooms" value={formData.rooms} onChange={handleChange}>
              <option value="">Select rooms</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>
        <p className="has-text-danger">{formErrors.rooms}</p>
      </div>

      <div className="field">
        <label htmlFor="price" className="label">Price</label>
        <div className="control">
          <input
            id="price"
            className="input"
            type="number"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <p className="has-text-danger">{formErrors.price}</p>
      </div>
    </div>
  );
};