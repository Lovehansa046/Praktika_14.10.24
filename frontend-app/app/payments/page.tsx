"use client";

import {useState, useEffect} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import axios from "axios";

export default function Payments() {
    const [searchTerm, setSearchTerm] = useState("");
    const [payments, setPayments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newPayment, setNewPayment] = useState({
        payment_name: "",
        contract_id: 1,
        payment_amount: "",
        legal_name: "",
        status: "pending",  // Убедитесь, что статус соответствует значению в ENUM
        received: true,
    });

    // Fetch existing payments from the backend
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get("http://localhost:8000/payments/");
                setPayments(response.data);
            } catch (error) {
                console.error("Error fetching payments:", error);
            }
        };
        fetchPayments();
    }, []);

    const handlePaymentChange = (e) => {
        const {name, value} = e.target;
        setNewPayment((prev) => ({...prev, [name]: value}));
    };

    const addPayment = async () => {
        try {
            const paymentData = {
                payment_name: newPayment.payment_name,
                contract_id: newPayment.contract_id,
                payment_amount: parseFloat(newPayment.payment_amount), // Преобразуем в число
                status: newPayment.status,
                legal_name: newPayment.legal_name,
                received: newPayment.received,
            };

            const response = await axios.post("http://localhost:8000/create/payments/", paymentData, {
                headers: {"Content-Type": "application/json"},
            });

            setPayments([...payments, response.data]); // Обновляем список платежей
            setNewPayment({
                contract_id: 1,
                legal_name: "",
                status: "pending", // Сбрасываем статус
                payment_amount: "",
                received: true,
            });
            setShowForm(false);
        } catch (error) {
            console.error("Error adding payment:", error);
        }
    };

    const filteredData = payments.filter(
        (item) =>
            item.legal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow max-w-screen-xl mx-4 md:mx-32 px-4 md:px-8 mb-6 mt-6">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">All Payments</h3>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                            View and manage payment records efficiently.
                        </p>
                    </div>
                    <div className="max-w-lg mb-6 mt-6">
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Add Payment
                        </button>
                    </div>
                </div>

                {/* Search Input */}
                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Search by legal name or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                </div>

                <div className="mt-12 relative h-max overflow-auto">
                    <table className="min-w-full table-auto text-sm text-left">
                        <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Payment Name</th>
                            <th className="py-3 pr-6">Legal Name</th>
                            <th className="py-3 pr-6">Status</th>
                            <th className="py-3 pr-6">Payment amount</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                        {filteredData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.payment_name}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.legal_name}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                                item.status === "paid"
                                                    ? "text-green-600 bg-green-50"
                                                    : item.status === "pending"
                                                        ? "text-yellow-600 bg-yellow-50"
                                                        : "text-red-600 bg-red-50"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                </td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.payment_amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Add Payment Form Modal */}
            {showForm && (
                <>
                    {/* Background Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setShowForm(false)}
                    ></div>

                    {/* Centered Form Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="relative p-6 max-w-md w-full bg-white rounded shadow-lg">
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                Close
                            </button>

                            <h2 className="text-xl font-bold mb-4">Add New Payment</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addPayment();
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium">Payment name</label>
                                    <input
                                        type="text"
                                        name="payment_name"
                                        value={newPayment.payment_name}
                                        onChange={handlePaymentChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Contract ID</label>
                                    <input
                                        type="number"
                                        name="contract_id"
                                        value={newPayment.contract_id}
                                        onChange={handlePaymentChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Payment amount</label>
                                    <input
                                        type="number"
                                        name="payment_amount"
                                        value={newPayment.payment_amount}
                                        onChange={handlePaymentChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Legal Name</label>
                                    <input
                                        type="text"
                                        name="legal_name"
                                        value={newPayment.legal_name}
                                        onChange={handlePaymentChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Status</label>
                                    <select
                                        name="status"
                                        value={newPayment.status}
                                        onChange={handlePaymentChange}
                                        className="w-full px-3 py-2 border rounded"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="overdue">Overdue</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                                >
                                    Add Payment
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
            <Footer/>
        </div>
    );
}
