"use client";
import { useId } from "react";
import { useFormContext } from "./form.context";

type Props = {
  name: string; // Form component uses `name` to keep track of data
  label: string; // label that gets displayed to user
  type: React.HTMLInputTypeAttribute;
  required?: boolean;
  min?: number;
  max?: number;
  onChange?: (data: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  name,
  label,
  type,
  required,
  min,
  max,
  onChange,
}: Props) {
  const id = useId(); // react will handle IDs for us
  const { getData, setData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(name, event.target.value);
    onChange?.(event.target.value, event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor={id}>{label}: </label>
      <input
        type={type}
        id={id}
        name={name}
        value={getData(name)}
        onChange={handleChange}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
}
