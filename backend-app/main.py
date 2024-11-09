from fastapi import FastAPI, Depends, HTTPException
from database.database import init_db, get_db  # Убедитесь, что get_db и init_db импортируются правильно
from database.models import Item, User, Contract, Payment
from database.schemas import ItemCreate, UserCreate, ContractCreate, PaymentCreate  # Схема ItemBase
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime

app = FastAPI()


@app.post("/create/items/", response_model=ItemCreate)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли пользователь с указанным user_id
    db_user = db.query(User).filter(User.id == item.user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Создаем объект Item для сохранения в базе данных
    db_item = Item(
        name=item.name,
        description=item.description,
        grade=item.grade,
        active=item.active,
        sku=item.sku,
        count=item.count,
        image_url=item.image_url,
        price=item.price,
        transaction_type=item.transaction_type,
        user_id=item.user_id  # связываем товар с пользователем
    )

    # Добавляем товар в базу данных
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)




#TODO Ответ по созданию платежа 500 ошибка
@app.post("create/payments/", response_model=PaymentCreate)
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли контракт с указанным contract_id
    db_contract = db.query(Contract).filter(Contract.id == payment.contract_id).first()
    if not db_contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    # Создаем объект Payment для сохранения в базе данных
    db_payment = Payment(
        received=payment.received,
        status=payment.status,
        contract_id=payment.contract_id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Добавляем запись в базу данных
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@app.post("/create/contracts/", response_model=ContractCreate)
def create_contract(contract: ContractCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли товар с указанным item_id
    db_item = db.query(Item).filter(Item.id == contract.item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    # Проверяем, существует ли покупатель с указанным buyer_user_id
    db_buyer = db.query(User).filter(User.id == contract.buyer_user_id).first()
    if not db_buyer:
        raise HTTPException(status_code=404, detail="Buyer not found")

    # Проверяем, существует ли продавец с указанным seller_user_id
    db_seller = db.query(User).filter(User.id == contract.seller_user_id).first()
    if not db_seller:
        raise HTTPException(status_code=404, detail="Seller not found")

    # Создаем объект Contract для сохранения в базе данных
    db_contract = Contract(
        item_id=contract.item_id,
        buyer_user_id=contract.buyer_user_id,
        seller_user_id=contract.seller_user_id,
        signed=contract.signed,
        total_value=contract.total_value,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Добавляем контракт в базу данных
    db.add(db_contract)
    db.commit()
    db.refresh(db_contract)
    return db_contract

@app.post("/create/user")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Проверка, существует ли пользователь с таким же email
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Создание объекта пользователя
    new_user = User(
        name=user.name,
        surname=user.surname,
        email=user.email,
        hash=hash_password(user.password),  # Хэшируем пароль перед сохранением
        verified=user.verified,
        active=user.active,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Добавляем пользователя в сессию и сохраняем
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "name": new_user.name, "email": new_user.email}

# Событие, выполняемое при запуске приложения
@app.on_event("startup")
def startup_event():
    # Инициализация базы данных
    init_db()

# Ваши маршруты и остальные обработчики
@app.get("/")
async def root():
    return {"message": "Hello, World!"}
