FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы приложения
COPY ./app /app

# Копируем файл зависимостей
COPY ./requirements.txt /app/requirements.txt

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r /app/requirements.txt

# Команда для запуска FastAPI с помощью Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]



#FROM python:3.9.2
#
## Устанавливаем рабочую директорию внутри контейнера
#WORKDIR /app
#
## Копируем файлы приложения
#COPY ./app /app
#
## Копируем файл зависимостей
#COPY ./requirements.txt /app/requirements.txt
#
## Устанавливаем зависимости
#RUN pip install --no-cache-dir -r /app/requirements.txt
#
## Команда для запуска FastAPI
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]