import InputField from '../components/input';
import ToggleSwitch from '../components/toggle';

const SecuritySettings: React.FC = () => {
    return (
        <form className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
            <ToggleSwitch label="Two-Factor Authentication" name="twoFactorAuthentication" />
            <InputField label="Change Password" name="changePassword" type="password" placeholder="New Password" />
            <InputField label="Session Management" name="sessionManagement" placeholder="Manage Active Sessions" />
        </form>
    );
};

export default SecuritySettings;
