import React, { useState, ChangeEvent } from 'react';

interface IProps {
  value?: string;
  type?: string;
  placeholder?: string;
  labelClassName: string;
  inputClassName: string;
  onChange: (value: string) => void;
  onFocusOut: (value: string) => void;
}

const EditableInput: React.FC<IProps> = (props) => {
  const { value, placeholder, labelClassName, inputClassName, onChange, onFocusOut, type = 'text' } = props;
  const [isEditing, setEditing] = useState(false);
  const [itemValue, setValue] = useState(value); 

  const handlerOnValueChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    const value = event.currentTarget.value;
    setValue(value);
    onChange(value);
  };

  const handleOnBlur: (event: React.FocusEvent<HTMLDivElement>) => void = (event) => {
    itemValue && onFocusOut(itemValue);
    setEditing(false);
  };

  const handleOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void = (event) => {
    setEditing(true);
  };

  return (
    isEditing 
      ? (
        <div 
          className={inputClassName}
          onBlur={handleOnBlur}
        >
          <input 
            {...props}
            autoFocus
            type={type} 
            onChange={handlerOnValueChange}
          />
        </div>
      ) 
      : (
        <div 
          className={labelClassName}
          onClick={handleOnClick}
        >
          <span>
            {value || placeholder}
          </span>
        </div>
      )
  );
  
};

export default EditableInput;
