from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from utils import get_minio_connector,get_bucket_name, upload_file_to_minio,save_file_metadata_to_database
from database import get_db, DBFiles  # Make sure to import your database utility functions

import os

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



@app.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:

        file_data = await file.read()
        upload_result=upload_file_to_minio(file=file_data)
        if upload_result:
            save_file_metadata_to_database(file_data)
            return {"status":"SUCCEEDED","message": "File uploaded", "file_name": file.filename}
        else:
            return {"status":"FAILED","message": "File upload failed", "file_name": file.filename}

    except Exception as e:
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
