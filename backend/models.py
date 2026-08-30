from dataclasses import dataclass
from datetime import datetime
from enum import Enum


class ContestStatus(Enum):
    UPCOMING = "upcoming"
    ONGOING = "ongoing"
    FINISHED = "finished"


@dataclass
class Contest:
    name: str
    platform: str
    start_time: datetime
    duration_minutes: int
    url: str
    source_id: str
    category: str | None
    status: ContestStatus