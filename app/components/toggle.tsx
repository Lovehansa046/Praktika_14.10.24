interface ToggleSwitchProps {
    label: string;
    name: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, name }) => (
    <div className="flex items-center justify-between mb-4">
        <span>{label}</span>
        <input type="checkbox" name={name} className="form-toggle h-6 w-6" />
    </div>
);

export default ToggleSwitch;
