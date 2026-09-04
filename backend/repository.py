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

    # New contest
    if not existing:
        contest_db = ContestDB(
            name=contest.name,
            platform=contest.platform,
            start_time=contest.start_time,
            duration_minutes=contest.duration_minutes,
            url=contest.url,
            source_id=contest.source_id,
            category=contest.category,
            status=(
                contest.status.value
                if hasattr(contest.status, "value")
                else contest.status
            ),
        )

        db.add(contest_db)
        db.commit()
        db.refresh(contest_db)

        return "new"

    # Convert status to string
    new_status = (
        contest.status.value
        if hasattr(contest.status, "value")
        else contest.status
    )

    # Check whether any important data has changed
    changed = (
        existing.name != contest.name
        or existing.start_time != contest.start_time
        or existing.duration_minutes != contest.duration_minutes
        or existing.url != contest.url
        or existing.category != contest.category
        or existing.status != new_status
    )

    # Existing contest with no changes
    if not changed:
        return "unchanged"

    # Update changed contest
    existing.name = contest.name
    existing.start_time = contest.start_time
    existing.duration_minutes = contest.duration_minutes
    existing.url = contest.url
    existing.category = contest.category
    existing.status = new_status

    db.commit()

    return "changed"