# ContestHub

### Competitive Programming Contest Aggregator

**ContestHub** is a web application that brings competitive programming contests from multiple platforms into one organized place.

The project is being developed as a practical Python backend project with a React frontend, focusing on data collection, normalization, persistence, REST APIs, and automated synchronization.

## 🚀 Live Demo

The React frontend is currently deployed and available online.

**Frontend:**  https://contest-hub-opal.vercel.app/

## 📌 Project Overview

Competitive programming contests are distributed across different platforms, making it inconvenient to keep track of upcoming events.

ContestHub aims to solve this by collecting contest information from multiple competitive programming platforms and presenting it through a unified interface.

The planned data flow is:

```text
Contest Platforms
       ↓
Data Collectors
       ↓
Data Normalization
       ↓
Deduplication
       ↓
PostgreSQL
       ↓
FastAPI
       ↓
React Dashboard