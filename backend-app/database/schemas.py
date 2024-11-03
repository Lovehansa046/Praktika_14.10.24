from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
from decimal import Decimal
from datetime import datetime

# Определяем Enum для типа транзакции
class TransactionType(str, Enum):
    sale = 'sale'
    purchase = 'purchase'

# Базовая схема для модели Item
class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    # grade: Optional[str] = None
    # active: bool
    sku: Optional[str] = None
    count: int
    image_url: Optional[str] = None
    price: Decimal
    transaction_type: TransactionType

# Схема для создания записи Item
class ItemCreate(ItemBase):
    user_id: int

# Схема для обновления записи Item
class ItemUpdate(ItemBase):
    name: Optional[str] = None
    count: Optional[int] = None

# Схема для отображения записи Item (например, в ответах API)
class ItemResponse(ItemBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
