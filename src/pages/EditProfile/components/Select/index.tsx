import React from 'react';
import { useFormContext } from 'react-hook-form';
import './style.css';

interface SelectProps {
  register: any
  options: string[];
}

const Select: React.FC<SelectProps> = ({ register, options }) => {
  return (
    <div className="select">
      {options.map((option) => (
        <label key={option} className="select__option">
          <input type="checkbox" value={option} {...register} className="select__checkbox" />
          <span className="select__custom-checkbox"></span>
          <span className="select__label-text">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default Select;