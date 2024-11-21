import {useState, useEffect} from 'react';
import axios from 'axios';

export default function DataList() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        sku: "",
        name: "",
        price: "",
        count: "",
        grade: "",
        sellerName: "",
        description: "",
        image_url: "",
        transaction_type: "",
        user_id: "",
        active: "true"
    });

    // Получаем данные из базы данных при монтировании компонента
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/items/');
                setItems(response.data);  // Заполняем данные
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchItems();
    }, []);  // Пустой массив зависимостей означает, что запрос будет выполнен только один раз при монтировании

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewProduct(prev => ({...prev, [name]: value}));
    };

    const addProduct = async () => {
        try {
            // Добавляем новый продукт
            const response = await axios.post('http://localhost:8000/create/items/', newProduct);
            console.log('Product added:', response.data);

            // Обновляем список товаров после добавления нового
            const updatedItems = await axios.get('http://localhost:8000/items/');
            setItems(updatedItems.data);

            // Очищаем форму и скрываем её
            setNewProduct({
                sku: "",
                name: "",
                price: "",
                count: "",
                grade: "",
                sellerName: "",
                description: "",
                image_url: "",
                transaction_type: "",
                user_id: "",
                active: "true"
            });
            setShowForm(false); // Скрыть форму после добавления
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const filteredData = items.filter(item =>
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
                            <td className="px-6 py-4 whitespace-nowrap">{(item.count * item.price).toFixed(2)}</td>
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
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50"
                            onClick={() => setShowForm(false)}
                        ></div>

                        {/* Контейнер модального окна */}
                        <div className="relative p-8 max-w-md w-full bg-white rounded shadow-lg">
                            <button
                                onClick={() => setShowForm(false)}
                                aria-label="Close modal"
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <h2 className="text-xl font-bold mb-4 px-6">Add New Product</h2>

                            <div className="max-h-[60vh] overflow-y-auto px-6 pb-6">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        addProduct();
                                    }}
                                    className="space-y-6"
                                >
                                    {[
                                        {name: "sku", type: "text", placeholder: "Введите SKU"},
                                        {name: "name", type: "text", placeholder: "Введите название"},
                                        {name: "price", type: "number", placeholder: "Введите цену"},
                                        {name: "count", type: "number", placeholder: "Количество на складе"},
                                        {name: "grade", type: "text", placeholder: "Уровень качества"},
                                        {name: "sellerName", type: "text", placeholder: "Имя продавца"},
                                        // {name: "totalPrice", type: "number", placeholder: "Общая цена"},
                                        {name: "description", type: "text", placeholder: "Описание продукта"},
                                        {name: "image_url", type: "url", placeholder: "URL изображения"},
                                        {name: "transaction_type", type: "text", placeholder: "Тип транзакции"},
                                        {name: "user_id", type: "text", placeholder: "ID пользователя"},
                                    ].map((field, idx) => (
                                        <div key={idx}>
                                            <label className="block text-sm font-medium capitalize">
                                                {field.name.replace(/_/g, " ")}
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={newProduct[field.name] || ""}
                                                onChange={handleProductChange}
                                                placeholder={field.placeholder}
                                                className="w-full px-3 py-2 border rounded"
                                                autoFocus={idx === 0}
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Add Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
