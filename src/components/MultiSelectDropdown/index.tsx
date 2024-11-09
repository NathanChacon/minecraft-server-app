import React, { useState } from 'react';
import './style.css';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  title: string;
  register: any;
  options: Option[];
  formName: string;
}

const MultiSelectDropdown: React.FC<SelectProps> = ({ title = "Selecione", formName,  register, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
  };

  return (
    <div className="multi-select">
      <div className="multi-select__header" onClick={toggleDropdown}>
        <span className="multi-select__selected-count">
          {selectedValues.length > 0 ? `${selectedValues.length} selecionados` : title}
        </span>
        <span className={`multi-select__arrow ${isOpen ? "multi-select__arrow--open" : ""}`}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      
      {isOpen && (
        <div className="multi-select__menu">
          {options.map((option) => (
            <label key={option.value} className="multi-select__item">
              <input
                type="checkbox"
                value={option.value}
                {...register(formName, {
                    onChange: handleCheckboxChange // Use register's onChange with our custom handler
                })}
               
                className="multi-select__checkbox"
              />
              <span className="multi-select__custom-checkbox"></span>
              <span className="multi-select__label-text">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;