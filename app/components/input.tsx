interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', placeholder }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="mt-1 p-2 border w-full rounded-md"
        />
    </div>
);

export default InputField;
