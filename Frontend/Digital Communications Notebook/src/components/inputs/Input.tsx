interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  name: string; // Add this line to the props
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  name, // Accept the name prop
  onChange,
}) => (
  <input
    type={type}
    name={name} // Pass the name to the input element
    className="py-2 px-4 mb-4 border rounded-xl w-full"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default Input;
