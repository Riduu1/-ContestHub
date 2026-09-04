from datetime import datetime, timezone

from database import SessionLocal
from models import Contest, ContestStatus
from repository import save_contest


def main():
    db = SessionLocal()

    try:
        contest = Contest(
            name="ContestHub Change Detection Test",
            platform="TestPlatform",
            start_time=datetime.now(timezone.utc),
            duration_minutes=120,
            url="https://example.com/test-contest",
            source_id="change-detection-test",
            category="testing",
            status=ContestStatus.UPCOMING,
        )

        # First save
        result1 = save_contest(db, contest)
        print("First save:", result1)

        # Second save - same data
        result2 = save_contest(db, contest)
        print("Second save:", result2)

        # Modify the contest
        contest.name = "ContestHub Change Detection Test - Updated"

        # Third save - changed data
        result3 = save_contest(db, contest)
        print("Third save:", result3)

    finally:
        db.close()


if __name__ == "__main__":
    main()