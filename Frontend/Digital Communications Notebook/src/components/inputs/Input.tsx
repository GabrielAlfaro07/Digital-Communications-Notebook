interface InputProps {
  type: string;
  placeholder?: string; // Optional as not all inputs need a placeholder
  value?: string; // Optional because file inputs don't use the `value` attribute
  name?: string; // Optional because some inputs might not need a name
  multiple?: boolean; // Add support for the `multiple` attribute
  accept?: string; // Add support for the `accept` attribute
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  name,
  multiple, // Add multiple prop
  accept, // Add accept prop
  onChange,
}) => (
  <input
    type={type}
    name={name}
    className="py-2 px-4 mb-4 border rounded-xl w-full"
    placeholder={placeholder}
    value={value}
    multiple={multiple} // Pass multiple to the input element
    accept={accept} // Pass accept to the input element
    onChange={onChange}
  />
);

export default Input;
