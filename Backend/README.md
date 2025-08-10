# Backend Project with MongoDB and Vercel Deployment

## Overview
This project is a backend application built with Node.js and Express, integrated with MongoDB for data storage. It is designed to be deployable on Vercel, utilizing serverless functions for handling API requests.

## Project Structure

```
Backend/
├── api/            # Serverless handler entry point
├── db/             # MongoDB connection utility
├── middleware/     # Express middleware (e.g., auth)
├── models/         # Mongoose models
├── routes/         # Express route handlers
├── scripts/        # Utility scripts (e.g., seeders)
├── .env            # Environment variables
├── app.js          # Main Express app
├── server.js       # Server entry point
├── users.json      # Admin user storage
├── package.json    # Project metadata and scripts
└── README.md       # This file
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd backend-app
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your MongoDB connection URI:
   ```
   MONGODB_URI=<your_mongodb_connection_uri>
   ```

4. **Run the Application Locally**
   You can start the server locally by running:
   ```bash
   node server.js
   ```
   The server will be running on `http://localhost:3001`.

##  Authentication

- Admin authentication uses JWT.
- Default admin credentials are created if `users.json` does not exist.
- Login endpoint: `POST /api/auth/login`

---

##  Scripts

| Command         | Description                |
|-----------------|---------------------------|
| `npm start`     | Start the server          |
| `npm run docs`  | Generate API docs (if configured) |
| `node scripts/seedPastEvents.js` | Seed past events data |

---

##  API Endpoints

- `/api/events`         — Manage events
- `/api/pastevents`     — Manage past events
- `/api/announcements`  — Manage announcements
- `/api/auth`           — Admin authentication

---

##  Documentation

- Source code is documented with JSDoc comments.
- To generate documentation, use:
  ```sh
  npx jsdoc -c jsdoc.json
  ```
  Output will be in the `docs/` folder (if configured).

---

##  Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License.

---

##  Contact

For questions or support, contact the Chips & Bytes team.