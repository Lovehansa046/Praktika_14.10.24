"use client";

import {useState} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import data from "./data.payments.json";

export default function Payments() {
    const [searchTerm, setSearchTerm] = useState("");
    const [payments, setPayments] = useState(data);
    const [showForm, setShowForm] = useState(false);
    const [newPayment, setNewPayment] = useState({
        payment: "",
        payment_amount: "",
        payment_date: "",
        legal_name: "",
        status: "Pending"
    });

    const handlePaymentChange = (e) => {
        const {name, value} = e.target;
        setNewPayment((prev) => ({...prev, [name]: value}));
    };

    const addPayment = () => {
        const updatedPayment = {...newPayment, payment_amount: parseFloat(newPayment.payment_amount)};
        setPayments([...payments, updatedPayment]);
        setNewPayment({payment: "", payment_amount: "", payment_date: "", legal_name: "", status: "Pending"});
        setShowForm(false);
    };

    const filteredData = payments.filter(item =>
        item.payment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.legal_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow max-w-screen-xl mx-4 md:mx-32 px-4 md:px-8 mb-6 mt-6">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            All Payments
                        </h3>
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
                        placeholder="Search by payment or legal name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                </div>

                <div className="mt-12 relative h-max overflow-auto">
                    <table className="min-w-full table-auto text-sm text-left">
                        <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Payment</th>
                            <th className="py-3 pr-6">Payment date</th>
                            <th className="py-3 pr-6">Status</th>
                            <th className="py-3 pr-6">Legal name</th>
                            <th className="py-3 pr-6">Payment amount</th>
                            <th className="py-3 pr-6"></th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                        {filteredData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.payment}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.payment_date}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                                item.status === "Paid"
                                                    ? "text-green-600 bg-green-50"
                                                    : item.status === "Pending"
                                                        ? "text-yellow-600 bg-yellow-50"
                                                        : "text-red-600 bg-red-50"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                </td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.legal_name}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.payment_amount}</td>
                                <td className="text-right whitespace-nowrap">
                                    <button
                                        className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                                    >
                                        Export to file
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 flex flex-col items-center relative h-max overflow-auto">
                    <button
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
                    >
                        Export all payments
                    </button>
                    <p className="text-gray-600 mt-2 text-xs text-center">Export all payment records to a file</p>
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
                            {/* Close Button */}
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>

                            <h2 className="text-xl font-bold mb-4">Add New Payment</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addPayment();
                                }}
                                className="space-y-4"
                            >
                                {["payment", "payment_amount", "payment_date", "legal_name"].map((field, idx) => (
                                    <div key={idx}>
                                        <label
                                            className="block text-sm font-medium capitalize">{field.replace("_", " ")}</label>
                                        <input
                                            type={field === "payment_amount" ? "number" : field.includes("date") ? "date" : "text"}
                                            name={field}
                                            value={newPayment[field]}
                                            onChange={handlePaymentChange}
                                            className="w-full px-3 py-2 border rounded"
                                            required={field !== "legal_name"}
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="block text-sm font-medium">Status</label>
                                    <select
                                        name="status"
                                        value={newPayment.status}
                                        onChange={handlePaymentChange}
                                        className="w-full px-3 py-2 border rounded"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Overdue">Overdue</option>
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

            <div className="w-full mb-6 mt-6">
                <Footer/>
            </div>
        </div>
    );
}
