"use client";

import {useState} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import data from "./data.contracts.json";

export default function Contracts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [contracts, setContracts] = useState(data);
    const [showForm, setShowForm] = useState(false);
    const [newContract, setNewContract] = useState({
        company_name: "",
        created_at: "",
        signed_at: "",
        download_document: "",
        contact_person: ""
    });

    // Handle input changes for the new contract form
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewContract((prev) => ({...prev, [name]: value}));
    };

    // Add a new contract to the list
    const addContract = () => {
        setContracts((prevContracts) => [...prevContracts, newContract]);
        setNewContract({
            company_name: "",
            created_at: "",
            signed_at: "",
            download_document: "",
            contact_person: ""
        });
        setShowForm(false);
    };

    // Filtered contracts for search term
    const filteredContracts = contracts.filter(item =>
        item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contact_person.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow max-w-screen-xl mx-4 md:mx-32 px-4 md:px-8 mb-6 mt-6">
                <div className="items-start justify-between md:flex">

                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            All Contracts
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                            Manage contracts and add new ones as needed.
                        </p>
                    </div>
                    <div className="max-w-lg mb-6 mt-6">

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Create Contract
                        </button>
                    </div>
                </div>

                {/* Search Input */}
                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Search by company name or contact person..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                </div>

                <div className="mt-12 relative h-max overflow-auto">
                    <table className="min-w-full table-auto text-sm text-left">
                        <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Company name</th>
                            <th className="py-3 pr-6">Created at</th>
                            <th className="py-3 pr-6">Signed at</th>
                            <th className="py-3 pr-6">Download document</th>
                            <th className="py-3 pr-6">Contact person</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                        {filteredContracts.map((item, idx) => (
                            <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.company_name}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.created_at}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.signed_at}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                    <a
                                        href={item.download_document}
                                        className="text-indigo-600 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download
                                    </a>
                                </td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.contact_person}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal for Adding New Contract */}
            {showForm && (
                <>
                    {/* Overlay */}
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>

                            <h2 className="text-xl font-bold mb-4">Add New Contract</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addContract();
                                }}
                                className="space-y-4"
                            >
                                {["company_name", "created_at", "signed_at", "download_document", "contact_person"].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium capitalize">
                                            {field.replace("_", " ")}
                                        </label>
                                        <input
                                            type={field.includes("at") ? "date" : field === "download_document" ? "url" : "text"}
                                            name={field}
                                            value={newContract[field]}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded"
                                            required={field !== "download_document"}
                                        />
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                                >
                                    Add Contract
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
