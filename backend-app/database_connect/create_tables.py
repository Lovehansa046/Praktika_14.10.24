from sqlalchemy import inspect
from sqlalchemy.exc import OperationalError
from database import get_engine
from models import User, UserSettings, Item, Contract, Payment


def create_tables_if_not_exist():
    try:
        # Проверка подключения к базе данных
        engine = get_engine()
        connection = engine.connect()
        connection.close()
    except OperationalError:
        print("Ошибка подключения к базе данных. Проверьте, запущена ли база данных.")
        return  # Прекращаем выполнение функции, если подключение не удалось

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



