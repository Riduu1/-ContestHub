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