# Simple Form Submission App

This is a simple web application for submitting form data and storing it in an in-memory SQLite database.

## How it Works

- The front-end of the application consists of an HTML form with fields for name and email. When the form is submitted, it sends a POST request to the server.
- The back-end of the application is built using Node.js with Express.js framework. It handles incoming requests, validates form data, checks if the email already exists in the database, and stores the form submissions in an in-memory SQLite database.
- If the submitted email already exists in the database, it returns an error response. Otherwise, it saves the form data to the database.
- The application also provides an endpoint to retrieve all form submissions stored in the database.

## Prerequisites

- Node.js installed on your machine

## How to Run

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/vas4oo/upwork_assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd upwork_assignment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the server:

   ```bash
   npm start
   ```

5. Open a web browser and go to `http://localhost:3000` to access the application.

## API Endpoints

- `POST /submit-form`: Submit form data. Required fields: name, email.
- `GET /submissions`: Retrieve all form submissions stored in the database.
