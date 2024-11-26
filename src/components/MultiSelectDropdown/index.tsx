import React, { useState, useEffect, useRef } from 'react';
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
  isMultiple?: boolean;
}

const MultiSelectDropdown: React.FC<SelectProps> = ({ title = "Selecione", formName, register, options, isMultiple = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (isMultiple) {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value];

      setSelectedValues(newSelectedValues);
    } else {
      setSelectedValue(value);
    }
  };

  return (
    <div className="multi-select" ref={dropdownRef}>
      <div className="multi-select__header" onClick={toggleDropdown}>
        <span className="multi-select__selected-count">
          {isMultiple
            ? selectedValues.length > 0
              ? `${selectedValues.length} selecionado${selectedValues.length > 1 ? 's' : ''}`
              : title
            : selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : title}
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
                type={isMultiple ? "checkbox" : "radio"}
                value={option.value}
                checked={isMultiple ? selectedValues.includes(option.value) : selectedValue === option.value}
                {...register(formName, {
                  onChange: handleCheckboxChange
                })}
                className={isMultiple ? "multi-select__checkbox" : "multi-select__radio"}
              />
              <span className={isMultiple ? "multi-select__custom-checkbox" : "multi-select__custom-radio"}></span>
              <span className="multi-select__label-text">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown