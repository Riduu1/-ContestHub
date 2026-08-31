import requests
from datetime import datetime

from models import Contest, ContestStatus


CODECHEF_API_URL = (
    "https://www.codechef.com/api/list/contests/all"
    "?sort_by=START&sorting_order=asc&offset=0&mode=all"
)


def fetch_codechef_contests():
    response = requests.get(
    CODECHEF_API_URL,
    headers={
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/151.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json,text/plain,*/*",
        "Referer": "https://www.codechef.com/",
    },
    timeout=10,
    )

    response.raise_for_status()

    data = response.json()

    if data.get("status") != "success":
        raise RuntimeError("CodeChef API returned an error")

    contests = []

    contests.extend(
        {
            **contest,
            "_status": ContestStatus.ONGOING,
        }
        for contest in data.get("present_contests", [])
    )

    contests.extend(
        {
            **contest,
            "_status": ContestStatus.UPCOMING,
        }
        for contest in data.get("future_contests", [])
    )

    return contests


def normalize_codechef_contest(contest_data):
    start_time = datetime.fromisoformat(
        contest_data["contest_start_date_iso"]
    )

    return Contest(
        name=contest_data["contest_name"],
        platform="CodeChef",
        start_time=start_time,
        duration_minutes=int(contest_data["contest_duration"]),
        url=f"https://www.codechef.com/{contest_data['contest_code']}",
        source_id=str(contest_data["contest_id"]),
        category=None,
        status=contest_data["_status"],
    )