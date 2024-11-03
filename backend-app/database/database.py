from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


def init_db():
    """Инициализирует базу данных и возвращает необходимые компоненты."""

    # URL подключения к базе данных PostgreSQL
    database_url = "postgresql://postgres:Plotar1404@db:5432/circular_base"

    # Создаем движок базы данных
    engine = create_engine(database_url)

    # Создаем базовый класс для моделей
    Base = declarative_base()

    # Создаем сессию
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Возвращаем движок, базовый класс и функцию для получения сессий
    return engine, Base, SessionLocal


def get_db(session_local):
    """Создает генератор сессий для работы с базой данных."""
    db = session_local()
    try:
        yield db
    finally:
        db.close()


# Инициализация базы данных
engine, Base, SessionLocal = init_db()
