import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Импортируем стили

const App = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [filteredItem, setFilteredItem] = useState(null);
    const [files, setFiles] = useState([]);

    // Получение данных
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/items');
            setItems(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('Ошибка при загрузке данных.');
        }
    };

    // Загрузка файлов
    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/files');
            setFiles(response.data.files);
            setError(null);
        } catch (err) {
            console.error('Error fetching files:', err);
            setError('Ошибка при загрузке файлов.');
        }
    };

    // Создание элемента
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newItem = {
            name,
            description,
        };

        try {
            await axios.post('http://localhost:8000/items', newItem);
            fetchItems();
            setName('');
            setDescription('');
            setError(null);
        } catch (err) {
            console.error('Error creating item:', err);
            setError('Ошибка при создании записи.');
        }
    };

    // Загрузка файлов
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchFiles(); // Обновляем список файлов после загрузки
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Ошибка при загрузке файла.');
        }
    };

    // Удаление файла
    const handleDeleteFile = async (fileId) => {
        try {
            await axios.delete(`http://localhost:8000/delete/${fileId}`);
            fetchFiles(); // Обновляем список файлов после удаления
        } catch (err) {
            console.error('Error deleting file:', err);
            setError('Ошибка при удалении файла.');
        }
    };

    // Поиск по ID
    const handleSearch = () => {
        const item = items.find((item) => item.id === parseInt(searchId));
        setFilteredItem(item ? item : null);
    };

    useEffect(() => {
        fetchItems();
        fetchFiles(); // Получаем файлы при инициализации
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Загрузка файлов</h2>
                <div className="flex items-center justify-center w-full">
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg w-full h-32 p-4 text-center hover:border-indigo-500">
                        <svg className="w-12 h-12 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16v4m10-4v4m-5-4v4m6-14H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path></svg>
                        <span className="text-gray-500">Нажмите для выбора файла</span>
                    </label>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Список файлов</h2>
                <ul className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    {files.map((file) => (
                        <li key={file.id} className="flex justify-between items-center">
                            <span>{file.title} ({file.size} bytes)</span>
                            <button onClick={() => handleDeleteFile(file.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
