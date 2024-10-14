from pydantic import BaseModel

# Схема для создания нового элемента (Item)
class ItemCreate(BaseModel):
    name: str
    description: str

# Схема для возвращаемого элемента (Item)
class Item(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        orm_mode = False  # Отключаем поддержку ORM
