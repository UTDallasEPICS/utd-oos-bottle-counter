# UTD Office of Sustainability Water Bottle Counter

This repository contains the code for the UTD Office of Sustainability Water Bottle Counter EPICS project. The `website` folder contains the API, database, and web front end. The `microcontroller` folder contains the code used with a microcontroller as the interface between the water fountains and the web server (API).

The Water Bottle Counter works to retrieve data from arduinos retrofitted into water fountains around campus, and provides a variety of different functions for interacting with the data that was retrieved.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install required dependencies.

```bash
cd website
npm i
```
Change the .env.example to just .env
## Usage

```bash
cd website

# start website
npm run dev
```

Navigate to the resulting website, usually at [http://localhost:3000](http://localhost:3000)

## Features
- Returns the total amount of water bottles saved by all tracked bottle refillers 
- Create new fountains in the database, starting at 0 or user defined number
- Creating new fountains returns the required dipswitch setting for that fountain's device
- Delete fountains from database
- Rename the fountains' via the web interface fountains

## Website Tech Stack
This is a fullstack application built in the Next.js framework.
The database is a simple SQLite schema, connected to our application via a prisma connection.
We used postman to test the application's API routes that affect the database, including the increment API used by the arduinos.

## Deployment
Not deployed yet, but will eventually be hosted on Office of Sustainability site, maybe the EPICS server.
