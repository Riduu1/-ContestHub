import hashlib
import json

from sqlalchemy import select
from sqlalchemy.orm import Session

from database_models import ContestDB
from models import Contest


def generate_content_hash(contest: Contest) -> str:
    contest_data = {
        "name": contest.name,
        "platform": contest.platform,
        "start_time": contest.start_time.isoformat(),
        "duration_minutes": contest.duration_minutes,
        "url": contest.url,
        "source_id": contest.source_id,
        "category": contest.category,
        "status": (
            contest.status.value
            if hasattr(contest.status, "value")
            else contest.status
        ),
    }

    content = json.dumps(
        contest_data,
        sort_keys=True,
        separators=(",", ":"),
    )

    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def save_contest(db: Session, contest: Contest):
    new_hash = generate_content_hash(contest)

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
            content_hash=new_hash,
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

    # Check whether contest data has changed
    if existing.content_hash == new_hash:
        return "unchanged"

    # Update changed contest
    existing.name = contest.name
    existing.start_time = contest.start_time
    existing.duration_minutes = contest.duration_minutes
    existing.url = contest.url
    existing.category = contest.category
    existing.status = new_status
    existing.content_hash = new_hash

    db.commit()

    return "changed"