import './Loader.css';

export const Loader = ({ size }) => {
  const fontSizeMap = {
    big: '10px',
    small: '5px'
  };
  const fontSize = fontSizeMap[size] ?? '10px';

  return (
    <div className="loaderWrapper">
      <div className="loader" style={{ fontSize }}>Loading...</div>
    </div>
  );
};