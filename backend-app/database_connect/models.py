# models.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DECIMAL, TIMESTAMP, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

# Определяем ENUM для статуса платежа
class PaymentStatus(enum.Enum):
    pending = 'pending'
    completed = 'completed'
    failed = 'failed'

# Определяем ENUM для типа транзакции
class TransactionType(enum.Enum):
    sale = 'sale'
    purchase = 'purchase'

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    surname = Column(String)
    email = Column(String)
    verified = Column(Boolean)
    hash = Column(String)
    active = Column(Boolean)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)

    # Связь с таблицей user_settings
    settings = relationship("UserSettings", back_populates="user")

class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    setting = Column(JSON)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)

    # Связь с пользователем
    user = relationship("User", back_populates="settings")

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    grade = Column(String)
    active = Column(Boolean)
    sku = Column(String)
    count = Column(Integer)
    image_url = Column(String)
    price = Column(DECIMAL)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    transaction_type = Column(Enum(TransactionType))

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey('items.id'))
    buyer_user_id = Column(Integer, ForeignKey('users.id'))
    seller_user_id = Column(Integer, ForeignKey('users.id'))
    signed = Column(Boolean)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    total_value = Column(DECIMAL)

    # Связи
    item = relationship("Item")
    buyer = relationship("User", foreign_keys=[buyer_user_id])
    seller = relationship("User", foreign_keys=[seller_user_id])

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    received = Column(Boolean)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    status = Column(Enum(PaymentStatus))
    contract_id = Column(Integer, ForeignKey('contracts.id'))

    # Связь с контрактом
    contract = relationship("Contract")
