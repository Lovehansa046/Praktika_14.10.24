"use client"
import {useState} from 'react'; // Import useState for state management
import data from './data.json';

export default function DataList() {
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [products, setProducts] = useState(data);
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
        const updatedProduct = {
            ...newProduct,
            price: parseFloat(newProduct.price),
            count: parseInt(newProduct.count),
            totalPrice: parseFloat(newProduct.price) * parseInt(newProduct.quantity),
            quantity: parseInt(newProduct.quantity)
        };
        setProducts([...products, updatedProduct]);
        setNewProduct({sku: "", name: "", price: "", count: "", sellerName: "", totalPrice: "", quantity: ""});
    };
    // Function to filter data based on the search term
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by name
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by SKU
        item.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by seller name
    );

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-6 mt-6">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Team members
                </h3>
                <p className="text-gray-600 mt-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
            {/* Search Input */}
            <div className="mt-8">
                <input
                    type="text"
                    placeholder="Search by SKU, Name, or Seller Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                />
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
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
            <div className="p-4 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addProduct();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium">SKU</label>
                        <input
                            type="text"
                            name="sku"
                            value={newProduct.sku}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="input"
                            name="name"
                            value={newProduct.name}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Count</label>
                        <input
                            type="number"
                            name="count"
                            value={newProduct.count}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Seller name</label>
                        <input
                            type="text"
                            name="sellerName"
                            value={newProduct.sellerName}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Total price</label>
                        <input
                            type="text"
                            name="totalPrice"
                            value={newProduct.totalPrice}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}
