import sys
from pathlib import Path

sys.path.append(
    str(Path(__file__).resolve().parents[2])
)
import requests
import re
from bs4 import BeautifulSoup
from datetime import datetime, timezone

from models import Contest, ContestStatus


TOPH_CONTESTS_URL = "https://toph.co/contests/all"


def fetch_toph_page():
    response = requests.get(
        TOPH_CONTESTS_URL,
        headers={
            "User-Agent": "Mozilla/5.0",
        },
        timeout=10,
    )

    response.raise_for_status()

    return response.text


def parse_toph_contests(html):
    soup = BeautifulSoup(html, "html.parser")

    return soup


def fetch_toph_contest_details(contest_url):
    response = requests.get(
        contest_url,
        headers={
            "User-Agent": "Mozilla/5.0",
        },
        timeout=10,
    )

    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    # Find contest start information
    element = soup.find(
        "div",
        class_="clander__eventtitle",
        string=lambda text: text and "Contest starts" in text,
    )

    if not element:
        return None

    event_body = element.parent

    # Extract timestamp
    timestamp_element = event_body.find(
        "span",
        class_="timestamp",
    )

    timestamp = timestamp_element.get("data-timestamp")

    start_time = datetime.fromtimestamp(
        int(timestamp),
        tz=timezone.utc,
    )

    # Extract duration
    event_meta = event_body.find(
        "div",
        class_="clander__eventmeta",
    )

    duration_text = event_meta.get_text(
        " ",
        strip=True,
    )

    hours = re.search(
        r"(\d+)\s+hours?",
        duration_text,
    )

    minutes = re.search(
        r"(\d+)\s+minutes?",
        duration_text,
    )

    duration_minutes = 0

    if hours:
        duration_minutes += int(hours.group(1)) * 60

    if minutes:
        duration_minutes += int(minutes.group(1))

    return {
        "start_time": start_time,
        "duration_minutes": duration_minutes,
    }


def fetch_toph_contest_links():
    html = fetch_toph_page()
    soup = parse_toph_contests(html)

    contests = []

    for link in soup.find_all("a", href=True):
        text = link.get_text(" ", strip=True)
        href = link["href"]

        if (
            href.startswith("/c/")
            and href.count("/") == 2
            and "#intent=practice" not in href
            and text
        ):
            contests.append({
                "name": text,
                "url": f"https://toph.co{href}",
            })

    return contests


def fetch_toph_contests():
    contest_links = fetch_toph_contest_links()

    contests = []

    for contest in contest_links:
        details = fetch_toph_contest_details(
            contest["url"]
        )

        if not details:
            continue

        contests.append({
            "name": contest["name"],
            "url": contest["url"],
            "start_time": details["start_time"],
            "duration_minutes": details["duration_minutes"],
        })

    return contests


def normalize_toph_contest(raw):
    end_time = raw["start_time"].timestamp() + (
        raw["duration_minutes"] * 60
    )

    current_time = datetime.now(timezone.utc).timestamp()

    if current_time < raw["start_time"].timestamp():
        status = ContestStatus.UPCOMING

    elif current_time < end_time:
        status = ContestStatus.ONGOING

    else:
        status = ContestStatus.FINISHED

    source_id = raw["url"].rstrip("/").split("/")[-1]

    return Contest(
        name=raw["name"],
        platform="Toph",
        start_time=raw["start_time"],
        duration_minutes=raw["duration_minutes"],
        url=raw["url"],
        source_id=source_id,
        category=None,
        status=status,
    )


if __name__ == "__main__":
    contests = fetch_toph_contests()

    print("Total contests:", len(contests))

    if contests:
        normalized = normalize_toph_contest(contests[0])

        print(normalized)