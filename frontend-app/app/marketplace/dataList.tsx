"use client";
import {useState} from 'react';
import data from './data.json';

export default function DataList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        sku: "",
        name: "",
        price: "",
        count: "",
        sellerName: "",
        totalPrice: "",
        quantity: ""
    });

    const handleProductChange = (e) => {
        const {name, value} = e.target;
        setNewProduct((prev) => ({...prev, [name]: value}));
    };

    const addProduct = () => {
        console.log("Product added:", newProduct);
        setNewProduct({
            sku: "",
            name: "",
            price: "",
            count: "",
            sellerName: "",
            totalPrice: "",
            quantity: ""
        });
        setShowForm(false); // Hide form after submission
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-6">
            <div className="items-start justify-between md:flex">

                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Team members
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="max-w-lg mb-6 mt-6">
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Create Product
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <input
                    type="text"
                    placeholder="Search by SKU, Name, or Seller Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                />
            </div>
            <div className="mt-8 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">SKU</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Price</th>
                        <th className="py-3 px-6">Count</th>
                        <th className="py-3 px-6">Seller Name</th>
                        <th className="py-3 px-6">Total Price</th>
                        <th className="py-3 px-6">Quantity</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                    {filteredData.map((item, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.sku}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.count}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.sellerName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.totalPrice}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for adding product */}
            {showForm && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setShowForm(false)}
                    ></div>

                    {/* Modal Form */}
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

                            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addProduct();
                                }}
                                className="space-y-4"
                            >
                                {["sku", "name", "price", "count", "sellerName", "totalPrice", "quantity"].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium capitalize">{field}</label>
                                        <input
                                            type={field === "price" || field === "count" || field === "quantity" ? "number" : "text"}
                                            name={field}
                                            value={newProduct[field]}
                                            onChange={handleProductChange}
                                            className="w-full px-3 py-2 border rounded"
                                            required
                                        />
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                                >
                                    Add Product
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
