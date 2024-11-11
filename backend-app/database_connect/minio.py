from minio import Minio
# from database import get_db
import io
# from models import Item
def get_bucket_name():
    bucket_name = "mybucket"
    return bucket_name

def get_minio_connector():
    minio_client = Minio(
        "minio:9000",
        access_key="Root123",
        secret_key="Root123312213n",
        secure=False
    )
    bucket_name=get_bucket_name()
    if not minio_client.bucket_exists(bucket_name):
        minio_client.make_bucket(bucket_name)

    return minio_client, bucket_name

def upload_file_to_minio(file):
    minio_client, bucket_name = get_minio_connector()
    file_stream = io.BytesIO(file)
    minio_client.put_object(
            bucket_name,
            file.filename,
            data=file_stream)
    return True



# def save_file_metadata_to_database(file):
#     db=get_db()
#     db_file=Item(title=file.filename,
#                 size=23324,
#                 path=f"{get_bucket_name()}/{file.filename}")
#     db.add(db_file)
#     db.commit()
#     db.refresh(db_file)