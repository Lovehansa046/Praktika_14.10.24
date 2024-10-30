"use client";

import {useState} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import data from "./data.payments.json";

export default function Payments() {
    const [searchTerm, setSearchTerm] = useState("");

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
            <div className="w-full mb-6 mt-6">
                <Footer/>
            </div>
        </div>
    );
}
