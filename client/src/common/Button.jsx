import "./button.scss"

export const Button = ({ children, onClick }) => {
  return (
    <button className="custom-button" onClick={() => onClick()}>
      {children}
    </button>
  );
};
