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

const App = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); // Состояние для хранения ошибок

  // Функция для получения данных из API
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/items');
      setItems(response.data);
      setError(null); // Сброс ошибок
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Ошибка при загрузке данных.');
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
      setError(null); // Сброс ошибок
    } catch (err) {
      console.error('Error creating item:', err);
      setError('Ошибка при создании записи.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Создание записи</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Отображение ошибок */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Добавить</button>
      </form>

      <h2>Список записей</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
