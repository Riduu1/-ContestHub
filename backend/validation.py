from datetime import datetime

from models import Contest, ContestStatus


def validate_contest(contest: Contest) -> Contest:
    if not contest.name.strip():
        raise ValueError("Contest name cannot be empty")

    if not contest.platform.strip():
        raise ValueError("Contest platform cannot be empty")

    if not isinstance(contest.start_time, datetime):
        raise ValueError("start_time must be a datetime")

    if contest.duration_minutes <= 0:
        raise ValueError("duration_minutes must be greater than 0")

    if not contest.url.strip():
        raise ValueError("Contest URL cannot be empty")

    if not contest.source_id.strip():
        raise ValueError("source_id cannot be empty")

    if not isinstance(contest.status, ContestStatus):
        raise ValueError("Invalid contest status")

    return contest