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
  const [selectedFile, setSelectedFile] = useState(null);

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

  // Функция для загрузки файлов
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

  // Функция для обработки отправки формы
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

  const handleSearch = () => {
    const item = items.find((item) => item.id === parseInt(searchId));
    setFilteredItem(item ? item : null);
  };

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

  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${fileId}`);
      fetchFiles(); // Обновляем список файлов после удаления
    } catch (err) {
      console.error('Error deleting file:', err);
      setError('Ошибка при удалении файла.');
    }
  };

  useEffect(() => {
    fetchItems();
    fetchFiles(); // Получаем файлы при инициализации
  }, []);

  return (
    <div className="app-container">

      <h2>Загрузка файлов</h2>
      <input type="file" onChange={handleFileUpload} />

      <h2>Список файлов</h2>
      <ul className="file-list">
        {files.map((file) => (
          <li key={file.id} className="file-list-item">
            {file.title} - {file.size} bytes
            <button onClick={() => handleDeleteFile(file.id)}>Удалить</button>
          </li>
        ))}
      </ul>



      {filteredItem ? (
        <div className="filtered-item">
          <h3>Найденный элемент:</h3>
          <p>ID: {filteredItem.id}</p>
          <p>Название: {filteredItem.name}</p>
          <p>Описание: {filteredItem.description}</p>
        </div>
      ) : (
        searchId && <p>Элемент не найден.</p>
      )}
    </div>
  );
};

export default App;
