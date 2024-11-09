import React from 'react';
import { useFormContext } from 'react-hook-form';
import './style.css';

interface SelectProps {
  register: any
  options: any[];
}

const Select: React.FC<SelectProps> = ({ register, options }) => {
  return (
    <div className="select">
      {options.map(({label, value}) => (
        <label key={value} className="select__option">
          <input type="checkbox" value={value} {...register} className="select__checkbox" />
          <span className="select__custom-checkbox"></span>
          <span className="select__label-text">{label}</span>
        </label>
      ))}
    </div>
  );
};

export default Select;