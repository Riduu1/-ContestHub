from sqlalchemy import select
from sqlalchemy.orm import Session

from database_models import ContestDB
from models import Contest


def save_contest(db: Session, contest: Contest):
    existing = db.scalar(
        select(ContestDB).where(
            ContestDB.platform == contest.platform,
            ContestDB.source_id == contest.source_id,
        )
    )

    if existing:
        return existing

    contest_db = ContestDB(
        name=contest.name,
        platform=contest.platform,
        start_time=contest.start_time,
        duration_minutes=contest.duration_minutes,
        url=contest.url,
        source_id=contest.source_id,
        category=contest.category,
        status=contest.status.value
        if hasattr(contest.status, "value")
        else contest.status,
    )

    db.add(contest_db)
    db.commit()
    db.refresh(contest_db)

    return contest_db