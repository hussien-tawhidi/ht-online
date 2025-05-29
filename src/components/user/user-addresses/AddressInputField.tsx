import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
}

const AddressInputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
}) => {
  return (
    <div>
      <label htmlFor={name} className='block mb-1 font-medium'>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className='w-full rounded px-3 py-2 placeholder:text-tusi text-tusi font-thin  focus:outline-none focus:border border-b border-tusi focus:ring-tusi transition'
        required={required}
        placeholder={placeholder}
        pattern={pattern}
      />
    </div>
  );
};

export default AddressInputField;
