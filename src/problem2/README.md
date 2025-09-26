# 99Tech Code Challenge - Problem 2

A Mock cryptocurrency exchange application built with Flask backend and React frontend, featuring real-time price data and currency conversion.

## Tech Stack

- **Backend**: Python 3.12 + Flask
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Infrastructure**: Docker + Docker Compose

## Getting Started

### Quick Start

```bash
docker-compose up --build
```

**Access the application**
   - Frontend: http://localhost:2999
   - Backend API: http://localhost:1234
   - Health check: http://localhost:1234/health

## API Endpoints

- `GET /health` - Health check
- `GET /prices/search` - Get all currency prices
- `GET /currency/search` - Get available currencies
- `POST /exchange` - Calculate currency exchange

## Data Source

The application fetches real-time cryptocurrency prices from:
https://interview.switcheo.com/prices.json

## Notes

- The backend includes artificial delays (0.5s) to simulate real-world API response times
- Token avatars are loaded from Switcheo's token icons repository
- The application includes comprehensive error handling and loading states
- Docker health checks ensure backend is ready before starting frontend