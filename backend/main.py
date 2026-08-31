from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from database import SessionLocal, engine
from database_models import Base, ContestDB
from repository import save_contest

from app.collectors.codeforces import (
    fetch_codeforces_contests,
    normalize_codeforces_contest,
)

from app.collectors.codechef import (
    fetch_codechef_contests,
    normalize_codechef_contest,
)


app = FastAPI(
    title="ContestHub API",
    description="Competitive programming contest aggregator API",
    version="1.0.0",
)


# Create database tables automatically
Base.metadata.create_all(bind=engine)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://contest-hub-opal.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "ContestHub API is running",
    }


@app.get("/api/contests")
def get_contests(
    search: str | None = Query(default=None),
    platform: str | None = Query(default=None),
    status: str | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=500),
):
    db = SessionLocal()

    try:
        query = select(ContestDB)

        # Search by contest name
        if search:
            query = query.where(
                ContestDB.name.ilike(f"%{search}%")
            )

        # Filter by platform
        if platform:
            query = query.where(
                ContestDB.platform == platform
            )

        # Filter by status
        if status:
            query = query.where(
                ContestDB.status == status
            )

        # Ordering
        if status == "finished":
            # Recently finished → older finished
            query = query.order_by(
                ContestDB.start_time.desc()
            )
        else:
            # Upcoming / ongoing → earliest first
            query = query.order_by(
                ContestDB.start_time.asc()
            )

        query = query.limit(limit)

        contests = db.scalars(query).all()

        return [
            {
                "id": contest.id,
                "name": contest.name,
                "platform": contest.platform,
                "start_time": contest.start_time,
                "duration_minutes": contest.duration_minutes,
                "url": contest.url,
                "source_id": contest.source_id,
                "category": contest.category,
                "status": contest.status,
            }
            for contest in contests
        ]

    finally:
        db.close()


# Synchronize contests from Codeforces and CodeChef
@app.post("/api/sync")
def sync_contests():
    db = SessionLocal()

    try:
        codeforces_raw = fetch_codeforces_contests()
        codechef_raw = fetch_codechef_contests()

        codeforces_count = 0
        codechef_count = 0

        for raw in codeforces_raw:
            contest = normalize_codeforces_contest(raw)
            save_contest(db, contest)
            codeforces_count += 1

        for raw in codechef_raw:
            contest = normalize_codechef_contest(raw)
            save_contest(db, contest)
            codechef_count += 1

        return {
            "message": "Contest synchronization successful",
            "codeforces": codeforces_count,
            "codechef": codechef_count,
        }

    finally:
        db.close()