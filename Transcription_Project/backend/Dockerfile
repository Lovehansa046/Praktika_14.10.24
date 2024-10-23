FROM python:3.12-slim-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates


ADD https://astral.sh/uv/install.sh /uv-installer.sh


RUN sh /uv-installer.sh && rm /uv-installer.sh


ENV PATH="/root/.cargo/bin/:$PATH"

WORKDIR /app


COPY ./app /app


COPY ./requirements.txt /app/requirements.txt


RUN uv venv --system
RUN uv pip install -r requirements.txt

CMD ["uv","run","uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]