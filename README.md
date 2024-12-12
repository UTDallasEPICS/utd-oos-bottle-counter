# UTD OOS Bottle Counter

This repository contains the code for the UTD Office of Sustainability Water Bottle Counter EPICS project. The `website` folder contains the API, database, and web front end. The `microcontroller` folder contains the code used with a microcontroller as the interface between the water fountains and the web server (API).

The Water Bottle Counter works to retrieve data from arduinos retrofitted into water fountains around campus and provides a variety of different functions for interacting with the data that was retrieved.

---

## Project Overview

The **UTD Office of Sustainability Water Bottle Counter** tracks the number of plastic bottles saved by using campus refill stations. It integrates microcontroller units and a web application to gather, store, and display this data. 

This project aims to encourage sustainability efforts by promoting awareness of water conservation through the visual impact of bottle-saving metrics.

---

## Features

- **Bottle Refill Tracking**: Tracks the number of water bottles saved at each fountain.
- **Data Visualization**: Displays bottle-saving data for all tracked fountains on an interactive map.
- **Fountain Management**:
  - Create: Add new fountains to the system with a user-defined starting count.
  - Read: View bottle-saving statistics.
  - Update: Rename fountains and update their configurations.
  - Delete: Remove fountains via the admin panel.

---

## Tech Stack

### Frontend
- **Framework**: Next.js
- **Styling**: TailwindCSS (or other UI libraries if specified)
- **Map Integration**: MapTiler API for displaying refill stations.

### Backend
- **Framework**: Next.js (combined backend and frontend framework)
- **Database**: SQLite (via Prisma ORM)
- **Environment Management**: `.env` file for API keys and configuration.

### Tools
- **Postman**: API testing.
- **Docker**: Database containerization (if used).
- **GitHub**: Source code management and collaboration.

---

## Installation and Setup

Follow these steps to set up and run the project locally:

### Prerequisites
1. Install [Node.js](https://nodejs.org).
2. Install [Docker](https://www.docker.com/) (if using Docker for the database).
3. Clone the repository:
   ```bash
   git clone https://github.com/UTDallasEPICS/utd-oos-bottle-counter.git
   ```
4. Navigate to the project directory:
   ```bash
   cd utd-oos-bottle-counter
   ```

### Environment Configuration
1. Rename `.env.example` to `.env`:
   ```bash
   mv .env.example .env
   ```
2. Open `.env` and update the `MAPTILER_API_KEY` with your MapTiler API key:
   ```
   MAPTILER_API_KEY=your_maptiler_api_key_here
   ```
   *This is required for the map to function.*

### Install Dependencies
1. Navigate to the `website` folder:
   ```bash
   cd website
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Run the Development Server
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Structure

### Repository Layout
```
utd-oos-bottle-counter/
├── microcontroller/          # Arduino code for tracking refill data
├── website/                  # Full-stack web application
│   ├── api/                  # Backend logic (e.g., API routes)
│   ├── prisma/               # Prisma database schema and migrations
│   ├── public/               # Static assets
│   └── pages/                # Next.js pages (frontend)
├── .env.example              # Example environment configuration
├── README.md                 # Project documentation
```

### Key Files
- **`.env.example`**: Contains placeholder environment variables like `MAPTILER_API_KEY`.
- **`schema.prisma`**: Defines the database schema.
- **`Map/Page.tsx`**: Additional resources and updates.

---

## Functional Requirements

### End User Features
- View bottle-saving statistics on an interactive map.
- Access aggregated data for all tracked fountains.

### Admin Features
- Add, rename, or delete fountains.
- Configure dipswitch settings for each fountain's microcontroller.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

Special thanks to the UTD Office of Sustainability and EPICS team for their collaboration and support.
