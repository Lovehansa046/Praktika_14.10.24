from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, TIMESTAMP
# from datetime import datetime

# Строка подключения к базе данных PostgreSQL

# Базовый класс для моделей
Base = declarative_base()

def get_engine():
    DATABASE_URL = "postgresql://postgres:Plotar1404@db:5432/circular_base"
    engine = create_engine(DATABASE_URL, echo=True)
    return engine

def get_session():
    init_db()
    return sessionmaker(autocommit=False, autoflush=False, bind=get_engine())

def get_db():
    SessionLocal = get_session()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=get_engine())

