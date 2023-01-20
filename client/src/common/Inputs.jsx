import "./inputs.scss";

export const TextInput = ({
  label,
  value,
  id,
  onChange,
  type,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <div className="form-label">{label}</div>
      <input
        className="custom-input"
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

export const TextArea = ({ label, value, id, onChange, type, placeholder }) => {
  return (
    <div className="form-group">
      <div className="form-label">{label}</div>
      <textarea
        style={{ resize: "none" }}
        className="custom-textarea"
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
