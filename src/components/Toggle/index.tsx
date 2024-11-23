import React from "react";
import './style.css';

interface ToggleProps {
  register: any;
  formName: string;
}

const Toggle: React.FC<ToggleProps> = ({ register, formName }) => {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        {...register(formName)}
        className="toggle-switch-checkbox"
      />
      <span className="toggle-switch-slider"></span>
    </label>
  );
};

export default Toggle;