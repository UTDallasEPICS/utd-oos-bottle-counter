# UTD Office of Sustainability Water Bottle Counter

This repository contains the code for the UTD Office of Sustainability Water Bottle Counter EPICS project. The `website` folder contains the API, database, and web front end. The `microcontroller` folder contains the code used with a microcontroller as the interface between the water fountains and the web server (API).

The Water Bottle Counter works to retrieve data from arduinos retrofitted into water fountains around campus, and provides a variety of different functions for interacting with the data that was retrieved.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install required dependencies.

```bash
npm install react
npm install prisma
```

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
- Rename fountains

## Website Tech Stack
This is a fullstack application built in the Next.js framework.
The database is a simple SQLite schema, connected to our application via a prisma connection
We used postman to test the application's API routes that affect the database, including the increment API used by the arduinos

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
