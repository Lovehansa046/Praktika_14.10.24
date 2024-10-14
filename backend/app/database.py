from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

# Строка подключения к базе данных PostgreSQL
DATABASE_URL = "postgresql://FastAPI_user:Plotar1404@db/FastAPI" #Не доконца понимаю работу данной бд и как в ней все устроено

# Создаем синхронный движок
engine = create_engine(DATABASE_URL, echo=True)

# Создаем синхронный сеанс
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

def init_db():
    # Инициализация базы данных
    Base.metadata.create_all(bind=engine)
