# Базовое изображение с Node.js (LTS версия)
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Устанавливаем переменную окружения для разработки
ENV NODE_ENV=development

# Пробрасываем порт, который использует Next.js (по умолчанию 3000)
EXPOSE 3000

# Запускаем приложение в режиме разработки
CMD ["npm", "run", "dev"]
