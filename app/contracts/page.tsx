"use client";

import {useState} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import data from "./data.contracts.json";

export default function Contracts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [setContracts] = useState(data);
    const [newContract, setNewContract] = useState({
        company_name: "",
        created_at: "",
        signed_at: "",
        download_document: "",
        contact_person: ""
    });

    // Update form input values
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewContract((prev) => ({...prev, [name]: value}));
    };

    // Add new contract to the list
    const addContract = () => {
        setContracts((prevContracts) => [...prevContracts, newContract]);
        setNewContract({
            company_name: "",
            created_at: "",
            signed_at: "",
            download_document: "",
            contact_person: ""
        });
    };

    const filteredData = data.filter(item =>
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
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
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
                        {filteredData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.company_name}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.created_at}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.signed_at}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.download_document}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.contact_person}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <div className="p-4 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Add New Contract</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addContract();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium">Company Name</label>
                        <input
                            type="text"
                            name="company_name"
                            value={newContract.company_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Created At</label>
                        <input
                            type="date"
                            name="created_at"
                            value={newContract.created_at}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Signed At</label>
                        <input
                            type="date"
                            name="signed_at"
                            value={newContract.signed_at}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Download Document URL</label>
                        <input
                            type="url"
                            name="download_document"
                            value={newContract.download_document}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Contact Person</label>
                        <input
                            type="text"
                            name="contact_person"
                            value={newContract.contact_person}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        Add Contract
                    </button>
                </form>
            </div>
            {/*<th></th>*/}
            <div className="w-full mb-6 mt-6">
                <Footer/>
            </div>
        </div>
    );
}
