from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


DATABASE_URL = "postgresql://postgres:RmsjirittL@localhost:5432/contest_hub"


engine = create_engine(DATABASE_URL)


SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)