import ToggleSwitch from '../components/toggle';

const NotificationsSettings: React.FC = () => {
    return (
        <form className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <ToggleSwitch label="Email Notifications" name="emailNotifications" />
            <ToggleSwitch label="SMS Notifications" name="smsNotifications" />
        </form>
    );
};

export default NotificationsSettings;
