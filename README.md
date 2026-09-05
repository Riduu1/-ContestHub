# ContestHub

### Competitive Programming Contest Aggregator

ContestHub is a web application that collects competitive programming contest data from multiple platforms and presents it in one place.

The project is built with a Python FastAPI backend, PostgreSQL database, and React frontend. The main focus is automated data collection, data normalization, efficient change detection, and synchronization of contest information.

## Live Demo

The React frontend is deployed and available online:

Frontend: https://contest-hub-opal.vercel.app/

Backend API: https://contesthub-tg79.onrender.com/

## Project Overview

Competitive programming contests are spread across different platforms, making it difficult to keep track of them from a single place.

ContestHub collects contest information from multiple competitive programming platforms, converts data from different sources into a common format, detects changes in existing data, and stores the results in PostgreSQL.

The overall data flow is:

```text
Contest Platforms
       ↓
Data Collection / Scraping
       ↓
Data Normalization
       ↓
Change Detection & Deduplication
       ↓
PostgreSQL
       ↓
FastAPI
       ↓
React Frontend


## Key Features

- Collect contest information from multiple competitive programming platforms
- Normalize different data formats into a unified contest schema
- Detect changes in existing contest information
- Avoid unnecessary database updates when data has not changed
- Store contest data in PostgreSQL
- Provide contest data through REST APIs using FastAPI
- Display upcoming, ongoing, and finished contests through a React interface
- Filter and search contests by platform and other attributes
- Automatically synchronize contest data

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

### Frontend

- React
- Vite
- Tailwind CSS

### Data Collection

- Platform-specific collectors
- API-based data collection
- Web scraping where required

## Data Processing

Different platforms provide contest information in different formats. ContestHub converts these responses into a unified schema containing fields such as:

```text
name
platform
start_time
duration_minutes
url
source_id
category
status


Before storing the data, the system checks existing contests and detects whether their important information has changed. This helps reduce unnecessary database updates during repeated synchronization.


## Current Status
ContestHub is currently deployed with the React frontend and FastAPI backend. Contest data from multiple platforms can be synchronized and stored in the production PostgreSQL database.
The project is being developed incrementally, with planned improvements around automated synchronization, efficient change detection, contest tracking, and notification features.