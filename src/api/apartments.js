const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getApartments = ({ price, rooms } = {}) => {
  let query = [];

  if (price) {
    query.push(`price=${price}`);
  }

  if (rooms) {
    query.push(`rooms=${rooms}`);
  }

  const queryString = query.join('&');

  let endpoint = `${BASE_URL}/apartments`;

  if (queryString) {
    endpoint += `?${queryString}`;
  }

  return fetch(endpoint).then(res => res.json());
};

export const deleteApartment = (id) => {
  const endpoint = `${BASE_URL}/apartments/${id}`;

  return fetch(endpoint, { method: 'DELETE', }).then(res => res.json());
};