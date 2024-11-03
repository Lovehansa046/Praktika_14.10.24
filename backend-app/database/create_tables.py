# create_tables.py
from sqlalchemy import inspect
from database import engine, Base
from models import User, UserSettings, Item, Contract, Payment

def create_tables_if_not_exist():
    # Получаем список существующих таблиц в базе данных
    inspector = inspect(engine)
    existing_tables = inspector.get_table_names()

    # Список таблиц, которые нужно создать
    tables_to_create = [User, UserSettings, Item, Contract, Payment]

    # Перебираем каждую таблицу и проверяем, существует ли она
    for table in tables_to_create:
        if table.__tablename__ not in existing_tables:
            print(f"Создание таблицы: {table.__tablename__}")
            table.__table__.create(bind=engine)  # Создание таблицы
        else:
            print(f"Таблица {table.__tablename__} уже существует, пропускаем.")


create_tables_if_not_exist()
