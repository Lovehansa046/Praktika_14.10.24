from fastapi import FastAPI, UploadFile, File, HTTPException
from minio import Minio
import os

app = FastAPI()

# Настройка MinIO
minio_client = Minio(
    os.getenv("MINIO_URL", "localhost:9000").replace("http://", "").replace("https://", ""),
    access_key=os.getenv("MINIO_ACCESS_KEY", "minioadmin"),
    secret_key=os.getenv("MINIO_SECRET_KEY", "minioadmin"),
    secure=False
)

bucket_name = "mybucket"
if not minio_client.bucket_exists(bucket_name):
    minio_client.make_bucket(bucket_name)

# Эндпоинт для загрузки файла
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Получаем данные файла
        file_data = await file.read()
        
        # Сохранение файла в MinIO
        minio_client.put_object(bucket_name, file.filename, file_data, length=len(file_data))

        return {"status": "File uploaded", "file_name": file.filename}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while uploading the file: {str(e)}")
