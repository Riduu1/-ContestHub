from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, select

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

from app.collectors.toph import (
    fetch_toph_contests,
    normalize_toph_contest,
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
    offset: int = Query(default=0, ge=0),
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

        # Count total matching contests before pagination
        total = db.scalar(
            select(func.count()).select_from(query.subquery())
        )

        # Pagination
        query = query.offset(offset).limit(limit)

        contests = db.scalars(query).all()

        return {
            "contests": [
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
            ],
            "total": total,
        }

    finally:
        db.close()


@app.get("/api/contests/{contest_id}")
def get_contest(contest_id: int):
    db = SessionLocal()

    try:
        contest = db.get(ContestDB, contest_id)

        if not contest:
            return {
                "error": "Contest not found"
            }

        return {
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

    finally:
        db.close()


# Synchronize contests from Codeforces, CodeChef, and Toph
@app.post("/api/sync")
def sync_contests():
    db = SessionLocal()

    try:
        codeforces_raw = fetch_codeforces_contests()
        codechef_raw = fetch_codechef_contests()
        toph_raw = fetch_toph_contests()

        stats = {
            "codeforces": {
                "new": 0,
                "changed": 0,
                "unchanged": 0,
            },
            "codechef": {
                "new": 0,
                "changed": 0,
                "unchanged": 0,
            },
            "toph": {
                "new": 0,
                "changed": 0,
                "unchanged": 0,
            },
        }

        # Process Codeforces
        for raw in codeforces_raw:
            contest = normalize_codeforces_contest(raw)
            result = save_contest(db, contest)
            stats["codeforces"][result] += 1

        # Process CodeChef
        for raw in codechef_raw:
            contest = normalize_codechef_contest(raw)
            result = save_contest(db, contest)
            stats["codechef"][result] += 1

        # Process Toph
        for raw in toph_raw:
            contest = normalize_toph_contest(raw)
            result = save_contest(db, contest)
            stats["toph"][result] += 1

        return {
            "message": "Contest synchronization successful",
            "stats": stats,
        }

    finally:
        db.close()