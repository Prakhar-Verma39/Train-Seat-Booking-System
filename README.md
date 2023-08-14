 ## Train Seat Booking System

This is a simple web application that simulates a train seat booking system. 

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Depedencies](#depedencies)
- [Usage](#usage)
- [Note](#note)
- [License](#license)

## Project Overview

The application allows users to reserve seats in a train coach following specific rules for seat allocation.This implementation of a train seat booking system uses the MVC (Model-View-Controller) architecture. The application is built using the Express.js framework for handling routes, EJS for rendering views, and Mongoose for interacting with a MongoDB database.

### How it Works

1. Users can input the number of seats they want to reserve in any of the previously made coach or add a new coach.
2. The application allocates and displays the seat numbers that have been booked, along with the availability status of all seats.

### Assumptions

- Seats are numbered starting from 1 to the coach's capacity.
- Seats are organized in rows with 7 seats per row (except the last row with remaining seats).
- Seats are represented visually with colors to indicate availability. (Green - reserved seats and gray - unreserved seats.)

### Glimpses

![Screenshot (125)](https://github.com/Prakhar-Verma39/Train-Seat-Booking-System/assets/103757447/ae957f86-b627-4779-af49-0b62c3cb3e52)
![Screenshot (126)](https://github.com/Prakhar-Verma39/Train-Seat-Booking-System/assets/103757447/3235b6a4-568d-4a75-88c0-a09296bf8d37)
![Screenshot (127)](https://github.com/Prakhar-Verma39/Train-Seat-Booking-System/assets/103757447/a2232e64-252c-43f0-a290-e109476e06a0)
![Screenshot (128)](https://github.com/Prakhar-Verma39/Train-Seat-Booking-System/assets/103757447/8a510477-c430-4f8b-9b31-5e7187d88080)
![Screenshot (129)](https://github.com/Prakhar-Verma39/Train-Seat-Booking-System/assets/103757447/48857f71-8a8c-4a4c-8bb7-7714449732cd)

## Features

1. There can be any number of seats in a coach of train, with 7 seats in most rows and the remaining seats in the last row.
2. Users can reserve up to 7 seats at a time.
3. Seats should be booked in one row whenever possible.
4. If seats are not available in a single row, nearby seats are booked.
5. Users can book multiple tickets until the coach is full.
6. The application does not require login functionality.

## Technologies Used

- MongoDB
- Express.js
- Bootstrap
- Node.js
- Other relevant libraries and technologies

## Dependencies

- `connect-flash`: Express middleware for displaying flash messages to users.
- `connect-mongo`: MongoDB session store for Express sessions.
- `dotenv`: Loads environment variables from a `.env` file.
- `ejs`: Template engine for rendering dynamic HTML pages.
- `ejs-mate`: EJS layout engine to create reusable templates.
- `express`: Web application framework for Node.js.
- `express-session`: Express middleware for managing user sessions.
- `method-override`: Allows using HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- `mongoose`: MongoDB object modeling for Node.js.

## Code Structure

- `index.js`: The main application setup and configuration.
- `views/`: Contains EJS templates for rendering views.
- `public/`: Stores static assets like CSS and client-side JavaScript.
- `models/`: Defines Mongoose schemas and models.
- `routes/`: Defines the routes and controllers for the application.
- `middleware/`: Custom middleware functions.

### Usage

1. Clone this repository:

```bash
git clone https://github.com/Prakhar-Verma39/Train-Seat-Booking-System.git
cd Train-Seat-Booking-System
```

2. Install dependencies.

```bash
npm install
```

3. Run the application.

```bash
node .\\index.js
```

4. Open a web browser and navigate to `http://localhost:4000`.

5. Choose any coach or add a new coach.

6. Enter the number of seats you want to reserve.

7. The application will display the booked seat numbers and the seat availability status.

### Note

This application is a simplified simulation of a train seat booking system and serves as a coding exercise.

## License

Specify the license under which your project is released. For example:

This project is licensed under the [MIT License](LICENSE).
