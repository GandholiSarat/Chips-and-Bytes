# Backend Project with MongoDB and Vercel Deployment

## Overview
This project is a backend application built with Node.js and Express, integrated with MongoDB for data storage. It is designed to be deployable on Vercel, utilizing serverless functions for handling API requests.

## Project Structure
```
backend-app
├── api
│   └── index.js          # Exports serverless function for Vercel
├── db
│   └── mongoose.js       # MongoDB connection setup
├── middleware
│   └── auth.js           # JWT authentication middleware
├── models
│   └── Event.js          # Mongoose model for events
├── routes
│   ├── auth.js           # User authentication routes
│   └── events.js         # Event management routes
├── .env                   # Environment variables
├── app.js                 # Main application setup
├── package.json           # Project dependencies and scripts
├── server.js              # Starts the Express server
└── README.md              # Project documentation
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

## Usage

- **Authentication**
  - POST `/api/auth/login`: Log in with username and password to receive a JWT token.

- **Event Management**
  - GET `/api/events`: Retrieve all events.
  - POST `/api/events`: Create a new event (admin only).
  - PUT `/api/events/:id`: Update an existing event by ID (admin only).
  - DELETE `/api/events/:id`: Delete an event by ID (admin only).

## Deployment on Vercel

To deploy this application on Vercel:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy the Application**
   Run the following command in the root directory:
   ```bash
   vercel
   ```

3. **Follow the Prompts**
   Follow the prompts to configure your deployment settings.

## License
This project is licensed under the MIT License.