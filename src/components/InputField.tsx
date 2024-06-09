import React, { useState } from "react";
import "./style/InputField.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 英数字で8文字以上のパスワードを検証する正規表現
  const passwordPattern = "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";

  return (
    <div className="InputField-container">
      {label && (
        <label htmlFor={id} className="InputField-label">
          {label}
        </label>
      )}
      <div className="InputField-password-container">
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="InputField-input"
          {...(type === "password" ? { pattern: passwordPattern } : {})}
          {...(type === "password"
            ? { title: "パスワードは英数字からなる8文字以上が必要です" }
            : {})}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="InputField-toggle-visibility"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
