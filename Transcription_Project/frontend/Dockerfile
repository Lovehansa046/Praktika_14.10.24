# Используем базовый образ Node.js для сборки
FROM node:16-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json ./
RUN npm install

# Копируем весь проект и собираем React
COPY . ./
RUN npm run build

# Создаем образ для деплоя, используя Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт для Nginx
EXPOSE 80

# Запускаем Nginx сервер
CMD ["nginx", "-g", "daemon off;"]
