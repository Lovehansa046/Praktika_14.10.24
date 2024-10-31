"use client";

import {useState} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import data from "./data.payments.json";

export default function Payments() {
    const [searchTerm, setSearchTerm] = useState("");
    const [payments, setPayments] = useState(data);
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
        setNewPayment({payment: "", payment_amount: "", payment_date: "", legal_name: "", status: ""});
    };

    const filteredData = data.filter(item =>
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
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
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
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                        Export to file
                    </button>
                    <p className="text-gray-600 mt-2 text-xs text-center">Export to file all payments</p>
                </div>
            </main>
            <div className="p-4 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Add New Payments</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addPayment();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium">Payment</label>
                        <input
                            type="text"
                            name="payment"
                            value={newPayment.payment}
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
                        <label className="block text-sm font-medium">Payment date</label>
                        <input
                            type="date"
                            name="payment_date"
                            value={newPayment.payment_date}
                            onChange={handlePaymentChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Legal name</label>
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
                        <input
                            type="text"
                            name="status"
                            value={newPayment.status}
                            onChange={handlePaymentChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        Add Payments
                    </button>
                </form>
            </div>
            <div className="w-full mb-6 mt-6">
                <Footer/>
            </div>
        </div>
    );
}
