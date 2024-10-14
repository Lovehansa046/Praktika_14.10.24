# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy import create_engine, text
# from sqlalchemy.orm import Session
# from .database import SessionLocal
# from . import schemas
# from fastapi.middleware.cors import CORSMiddleware


# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Адрес React-приложения
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Зависимость для получения сессии базы данных
# def get_db() -> Session:
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.post("/items/", response_model=schemas.Item)
# def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
#     query = text("""
#         INSERT INTO items (name, description) 
#         VALUES (:name, :description) 
#         RETURNING id, name, description
#     """)
#     result = db.execute(query, {"name": item.name, "description": item.description})
#     db.commit()
#     return result.fetchone()

# @app.get("/items/", response_model=list[schemas.Item])
# def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     query = text("""
#         SELECT id, name, description 
#         FROM items 
#         ORDER BY id 
#         LIMIT :limit OFFSET :skip
#     """)
#     result = db.execute(query, {"limit": limit, "skip": skip})
#     return result.fetchall()

# @app.get("/items/{item_id}", response_model=schemas.Item)
# def read_item(item_id: int, db: Session = Depends(get_db)):
#     query = text("""
#         SELECT id, name, description 
#         FROM items 
#         WHERE id = :item_id
#     """)
#     result = db.execute(query, {"item_id": item_id})
#     item = result.fetchone()
#     if item is None:
#         raise HTTPException(status_code=404, detail="Item not found")
#     return item
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import schemas
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

# Создаем экземпляр приложения FastAPI
app = FastAPI()

# Настраиваем CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Адрес React-приложения
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Зависимость для получения сессии базы данных
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    query = text("""INSERT INTO items (name, description) VALUES (:name, :description) RETURNING id, name, description""")
    try:
        result = db.execute(query, {"name": item.name, "description": item.description})
        db.commit()
        logger.info("Item created successfully: %s", item.name)
        return result.fetchone()
    except Exception as e:
        db.rollback()  # Откатываем изменения в случае ошибки
        logger.error("Error creating item: %s", e)
        raise HTTPException(status_code=500, detail="Error occurred while creating item.")

@app.get("/items/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    query = text("""SELECT id, name, description FROM items ORDER BY id LIMIT :limit OFFSET :skip""")
    try:
        result = db.execute(query, {"limit": limit, "skip": skip})
        items = result.fetchall()
        logger.info("Retrieved %d items", len(items))
        return items
    except Exception as e:
        logger.error("Error retrieving items: %s", e)
        raise HTTPException(status_code=500, detail="Error occurred while retrieving items.")

@app.get("/items/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    query = text("""SELECT id, name, description FROM items WHERE id = :item_id""")
    try:
        result = db.execute(query, {"item_id": item_id})
        item = result.fetchone()
        if item is None:
            logger.warning("Item with id %d not found", item_id)
            raise HTTPException(status_code=404, detail="Item not found")
        logger.info("Item retrieved: %s", item.name)
        return item
    except Exception as e:
        logger.error("Error retrieving item with id %d: %s", item_id, e)
        raise HTTPException(status_code=500, detail="Error occurred while retrieving item.")
