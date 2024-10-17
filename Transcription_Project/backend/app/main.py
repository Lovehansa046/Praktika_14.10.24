from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

from database import get_db, DBFiles  # Make sure to import your database utility functions
from minio import Minio
import os
import io
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Адрес React-приложения
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Настройка MinIO
def get_minio_connector():
    minio_client = Minio(
        "minio:9000",
        access_key="Root123",
        secret_key="Root123312213n",
        secure=False
    )

    bucket_name = "mybucket"
    if not minio_client.bucket_exists(bucket_name):
        minio_client.make_bucket(bucket_name)

    return minio_client, bucket_name


@app.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Получаем MinIO клиент и имя бакета
        minio_client, bucket_name = get_minio_connector()

        # Читаем содержимое файла
        file_data = await file.read()
        file_size = len(file_data)

        # Создаем поток из прочитанных данных
        file_stream = io.BytesIO(file_data)

        # Сохранение файла в MinIO
        minio_client.put_object(
            bucket_name,
            file.filename,
            data=file_stream,
            length=file_size
        )

        # Создаем объект для записи в базу данных
        db_file = DBFiles(
            title=file.filename,
            size=file_size,
            path=f"{bucket_name}/{file.filename}"
        )

        # Записываем информацию о файле в базу данных
        db.add(db_file)
        db.commit()
        db.refresh(db_file)

        return {"status": "File uploaded", "file_name": file.filename}

    except Exception as e:
        print(e)
        return {"status": "error", "message": str(e)}

@app.get("/files")
def get_all_files(db: Session = Depends(get_db)):
    try:
        # Получаем все записи из базы данных
        files = db.query(DBFiles).all()

        # Преобразуем записи в список словарей
        file_list = []
        for file in files:
            file_list.append({
                "id": file.id,
                "title": file.title,
                "duration": file.duration,
                "created_at": file.created_at,
                "size": file.size,
                "path": file.path
            })

        return {"status": "success", "files": file_list}

    except Exception as e:
        print(e)
        return {"status": "error", "message": str(e)}
    

@app.delete("/delete/{file_id}")
async def delete_file(file_id: int, db: Session = Depends(get_db)):
    # Получаем файл из базы данных по ID
    db_file = db.query(DBFiles).filter(DBFiles.id == file_id).first()
    
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")

    try:
        # Получаем MinIO клиент и имя бакета
        minio_client, bucket_name = get_minio_connector()

        # Удаляем файл из MinIO
        minio_client.remove_object(bucket_name, db_file.title)

        # Удаляем запись из базы данных
        db.delete(db_file)
        db.commit()

        return {"status": "File deleted", "file_id": file_id}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
