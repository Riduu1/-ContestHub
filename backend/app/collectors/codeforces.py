import requests
from datetime import datetime, timezone

from models import Contest, ContestStatus


CODEFORCES_API_URL = "https://codeforces.com/api/contest.list"


def fetch_codeforces_contests():
    response = requests.get(
        CODEFORCES_API_URL,
        timeout=10,
    )

    response.raise_for_status()

    data = response.json()

    if data["status"] != "OK":
        raise RuntimeError("Codeforces API returned an error")

    return data["result"]


def normalize_codeforces_contest(contest_data):
    phase = contest_data["phase"]

    if phase == "BEFORE":
        status = ContestStatus.UPCOMING
    elif phase == "CODING":
        status = ContestStatus.ONGOING
    else:
        status = ContestStatus.FINISHED

    return Contest(
        name=contest_data["name"],
        platform="Codeforces",
        start_time=datetime.fromtimestamp(
            contest_data["startTimeSeconds"],
            tz=timezone.utc,
        ),
        duration_minutes=contest_data["durationSeconds"] // 60,
        url=f"https://codeforces.com/contest/{contest_data['id']}",
        source_id=str(contest_data["id"]),
        category=contest_data["type"],
        status=status,
    )