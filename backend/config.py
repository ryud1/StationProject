import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "postgresql://postgres:postgres@db:5450/estacao_db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False