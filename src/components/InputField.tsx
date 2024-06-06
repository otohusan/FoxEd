import "./style/InputField.css";

type InputFieldProps = {
  id: string;
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="InputField-container">
      {label && (
        <label htmlFor={id} className="InputField-label">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="InputField-input"
      />
    </div>
  );
};

export default InputField;
