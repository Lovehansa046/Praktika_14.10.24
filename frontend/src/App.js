import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  // Функция для получения данных с бэкенда
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/items/");
      setItems(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  // Вызов fetchItems при монтировании компонента
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1>Список элементов</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
