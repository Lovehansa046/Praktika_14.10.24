from fastapi import FastAPI, UploadFile, File, HTTPException
from minio import Minio
import os
import io  # Импортируем модуль io


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
# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     try:
#         # Получаем данные файла
#         file_data = await file.read()
        
#         # Получаем MinIO клиент и имя бакета
#         minio_client, bucket_name = get_minio_connector()
        
#         # Сохранение файла в MinIO
#         minio_client.put_object(bucket_name, file.filename, file_data, length=len(file_data))

#         return {"status": "File uploaded", "file_name": file.filename}
    
#     except Exception as e:
#         print(e)
#         return str(e)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Получаем MinIO клиент и имя бакета
        minio_client, bucket_name = get_minio_connector()

        # Читаем содержимое файла
        file_data = await file.read()  # Читаем данные файла
        file_size = len(file_data)  # Получаем размер файла

        # Создаем поток из прочитанных данных
        file_stream = io.BytesIO(file_data)

        # Сохранение файла в MinIO
        minio_client.put_object(
            bucket_name,
            file.filename,
            data=file_stream,  # Передаем поток
            length=file_size  # Указываем размер файла
        )

        return {"status": "File uploaded", "file_name": file.filename}

    except Exception as e:
        print(e)
        return {"status": "error", "message": str(e)}
    
  
@app.get("/files")
async def list_files():
    try:
        # Получаем MinIO клиент и имя бакета
        minio_client, bucket_name = get_minio_connector()

        # Получаем список объектов в бакете
        objects = minio_client.list_objects(bucket_name)
        files = [obj.object_name for obj in objects]  # Список имен файлов

        return {"status": "success", "files": files}

    except Exception as e:
        print(e)
        return {"status": "error", "message": str(e)}
