from fastapi import FastAPI, UploadFile, File, HTTPException
from minio import Minio
import os

app = FastAPI()

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

# Эндпоинт для загрузки файла
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Получаем данные файла
        file_data = await file.read()
        
        # Получаем MinIO клиент и имя бакета
        minio_client, bucket_name = get_minio_connector()
        
        # Сохранение файла в MinIO
        minio_client.put_object(bucket_name, file.filename, file_data, length=len(file_data))

        return {"status": "File uploaded", "file_name": file.filename}
    
    except Exception as e:
        print(e)
        return str(e)
