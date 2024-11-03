import InputField from '../components/input';

const IntegrationsSettings: React.FC = () => {
    return (
        <form className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Integrations</h2>
            <InputField label="Third-party Apps" name="thirdPartyApps" placeholder="Connect with Google" />
            {/* Add fields as necessary */}
        </form>
    );
};

export default IntegrationsSettings;
