# models.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DECIMAL, TIMESTAMP, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import enum
from datetime import datetime

Base = declarative_base()


# Определяем ENUM для статуса платежа
class PaymentStatus(enum.Enum):
    pending = 'pending'
    paid = 'paid'
    overdue = 'overdue'


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
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Связь с таблицей user_settings
    settings = relationship("UserSettings", back_populates="user")


class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    setting = Column(JSON)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

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
    sellerName = Column(String)
    image_url = Column(String)
    price = Column(DECIMAL)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow,
                        onupdate=datetime.utcnow)
    transaction_type = Column(Enum(TransactionType))


class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey('items.id'))
    buyer_user_id = Column(Integer, ForeignKey('users.id'))
    seller_user_id = Column(Integer, ForeignKey('users.id'))
    download_document = Column(String)
    company_name = Column(String)
    contact_person = Column(String)
    signed = Column(Boolean)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow,
                        onupdate=datetime.utcnow)
    total_value = Column(DECIMAL)

    # Связи
    item = relationship("Item")
    buyer = relationship("User", foreign_keys=[buyer_user_id])
    seller = relationship("User", foreign_keys=[seller_user_id])


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    received = Column(Boolean, default=True)
    payment_name = Column(String)
    payment_amount = Column(DECIMAL)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)  # автоматически установится время при создании
    updated_at = Column(TIMESTAMP, default=datetime.utcnow,
                        onupdate=datetime.utcnow)  # автоматически обновляется при изменении
    status = Column(Enum(PaymentStatus))
    legal_name = Column(String)
    contract_id = Column(Integer, ForeignKey('contracts.id'))

    # Связь с контрактом
    contract = relationship("Contract")
