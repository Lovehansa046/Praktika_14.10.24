import InputField from "../components/input";

const AccountSettings: React.FC = () => {
    return (
        <form className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <InputField label="Full Name" name="fullName" placeholder="John Doe" />
            <InputField label="Email" name="email" type="email" placeholder="example@domain.com" />
            <InputField label="Profile Picture" name="profilePicture" type="file" />
            <InputField label="Contact Number" name="contactNumber" type="tel" placeholder="+1234567890" />

            <h2 className="text-lg font-semibold mt-8 mb-4">Company Information</h2>
            <InputField label="Company Name" name="companyName" placeholder="Company LLC" />
            <InputField label="Industry" name="industry" placeholder="Software Development" />
            <InputField label="Company Size" name="companySize" placeholder="50-100" />

            <h2 className="text-lg font-semibold mt-8 mb-4">Language & Region</h2>
            <InputField label="Language" name="language" placeholder="English" />
            <InputField label="Time Zone" name="timeZone" placeholder="GMT-5" />
        </form>
    );
}

export default AccountSettings;
