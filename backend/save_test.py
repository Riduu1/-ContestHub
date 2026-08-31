from database import SessionLocal
from repository import save_contest

from app.collectors.codeforces import (
    fetch_codeforces_contests,
    normalize_codeforces_contest,
)

from app.collectors.codechef import (
    fetch_codechef_contests,
    normalize_codechef_contest,
)


def main():
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

        print("Codeforces processed:", codeforces_count)
        print("CodeChef processed:", codechef_count)
        print("Contest synchronization successful")

    finally:
        db.close()


if __name__ == "__main__":
    main()