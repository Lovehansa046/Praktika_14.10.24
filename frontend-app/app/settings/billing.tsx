import InputField from '../components/input';

const BillingSettings: React.FC = () => {
    return (
        <form className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
            <InputField label="Payment Method" name="paymentMethod" placeholder="Credit Card" />
            <InputField label="Billing Address" name="billingAddress" placeholder="123 Main St." />

            <h2 className="text-lg font-semibold mt-8 mb-4">Invoice History</h2>
            {/* Add fields or list for invoice history if required */}
        </form>
    );
};

export default BillingSettings;
