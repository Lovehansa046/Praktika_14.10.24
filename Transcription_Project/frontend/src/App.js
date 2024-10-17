import React, {useState, useEffect} from 'react';
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
        <div className="app-container">
            <div className="file-upload-section">
                <h2 className="heading">Загрузка файлов</h2>
                <div className="upload-box">
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        className="file-input"
                    />
                    <label htmlFor="file-upload" className="file-label">
                        Выберите файл
                    </label>
                    {/*<button className="upload-button" onClick={handleFileUpload}>*/}
                    {/*    Загрузить*/}
                    {/*</button>*/}
                </div>
            </div>

            <div className="file-list-section">
                <h2 className="heading">Список файлов</h2>
                <ul className="file-list">
                    {files.map((file) => (
                        <li key={file.id} className="file-list-item">
                            <span className="file-name">{file.title}</span>
                            <span className="file-size">{file.size} bytes</span>
                            <button onClick={() => handleDeleteFile(file.id)} className="delete-button">
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
};

export default App;
