// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [items, setItems] = useState([]);

//   // Функция для получения данных из API
//   const fetchItems = async () => {
//     const response = await axios.get('http://localhost:8000/items'); // Замените на ваш эндпоинт
//     setItems(response.data);
//   };

//   // Функция для обработки отправки формы
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const newItem = {
//       name,
//       description,
//     };

//     await axios.post('http://localhost:8000/items', newItem); // Замените на ваш эндпоинт
//     fetchItems(); // Обновляем список
//     setName('');
//     setDescription('');
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <div>
//       <h1>Создание записи</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Название:
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Описание:
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <button type="submit">Добавить</button>
//       </form>

//       <h2>Список записей</h2>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.name}: {item.description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="app-container">
      <h1>Создание записи</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>
            Название:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Описание:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Добавить</button>
      </form>

      <h2>Список записей</h2>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item-list-item">
            {item.name}: {item.description}
          </li>
        ))}
      </ul>

      <h2>Поиск по ID</h2>
      <div className="search-container">
        <input
          type="number"
          placeholder="Введите ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Поиск</button>
      </div>

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
