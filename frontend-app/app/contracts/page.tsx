"use client";

import {useState, useEffect} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import axios from "axios";

export default function Contracts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [contracts, setContracts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newContract, setNewContract] = useState({
        company_name: "",
        item_id: 0,
        buyer_user_id: 0,
        seller_user_id: 0,
        total_value: 0,
        signed: false,
        download_document: "",
        contact_person: "",
    });

    const API_BASE_URL = "http://localhost:8000"; // Замените на ваш URL

    const getContracts = async () => {
        const response = await axios.get(`${API_BASE_URL}/contracts/`);
        return response.data;
    };

    const createContract = async (contract) => {
        const response = await axios.post(`${API_BASE_URL}/create/contracts/`, contract);
        return response.data;
    };

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const data = await getContracts();
                setContracts(data);
            } catch (error) {
                console.error("Failed to load contracts:", error);
            }
        };

        fetchContracts();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewContract((prev) => ({...prev, [name]: value}));
    };

    const addContract = async () => {
        try {
            const addedContract = await createContract(newContract);
            setContracts((prevContracts) => [...prevContracts, addedContract]);
            setNewContract({
                company_name: "",
                item_id: 0,
                buyer_user_id: 0,
                seller_user_id: 0,
                total_value: 0,
                signed: false,
                download_document: "",
                contact_person: "",
            });
            setShowForm(false);
        } catch (error) {
            console.error("Error adding contract:", error);
        }
    };

    const filteredContracts = contracts.filter((item) => {
        const companyName = item?.company_name || ""; // Проверяем наличие свойства
        const contactPerson = item?.contact_person || ""; // Проверяем наличие свойства

        return (
            companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


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
                            <th className="py-3 pr-6">Signed</th>
                            <th className="py-3 pr-6">Download document</th>
                            <th className="py-3 pr-6">Contact person</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                        {filteredContracts.map((item, idx) => (
                            <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.company_name}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.created_at}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.signed ? "Yes" : "No"}</td>
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
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative p-6 w-full max-w-md bg-white rounded shadow-lg">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            Close
                        </button>

                        <h2 className="text-xl font-bold mb-4">Add New Contract</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addContract();
                            }}
                            className="space-y-4"
                        >
                            {["company_name", "item_id", "buyer_user_id", "seller_user_id", "total_value", "signed", "download_document", "contact_person"].map((field, idx) => (
                                <div key={idx}>
                                    <label className="block text-sm font-medium capitalize">
                                        {field.replace("_", " ")}
                                    </label>
                                    <input
                                        type={field === "signed" ? "checkbox" : "text"}
                                        name={field}
                                        value={newContract[field]}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
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
            )}

            <Footer/>
        </div>
    );
}
