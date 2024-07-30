# Check Flight Status

## Description

The **Check Flight Status** application is a real-time flight status tracking system. It fetches flight data from a MongoDB database and sends notifications via email and SMS whenever there are changes in the flight data. Users can also search for flight details based on the flight code they provide.

## Technologies Used

- **Frontend:** React, TailwindCSS, Vite
- **Backend:** Node.js, Express, MongoDB
- **Notifications:** Email (using NodeMailer), SMS (integrated Twilio)

## Features

- Fetches and updates flight status from a MongoDB database.
- Sends notifications via email and SMS when there are changes in flight data.
- Allows users to search for flight details based on flight code.
- Real-time updates to keep users informed about flight statuses.

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB server running

### Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies for both frontend and backend:**

    - For the backend:

        ```bash
        cd backend
        npm install
        npm install twilio
        ```

    - For the frontend:

        ```bash
        cd frontend
        npm install
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init -p
        npm install axios
        ```
    - Configure 'tailwind.config.js':
        ```
           content: [
              "./index.html",
              "./src/**/*.{js,ts,jsx,tsx}",
            ],
        ```
    - Add the Tailwind directives to './src/index.css'
        ```
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        ```
        
3. **Environment Variables**

    Create a `.env` file in the `backend` directory with the following variables:

    ```bash
    MONGODB_URI=<your-mongodb-uri>
    EMAIL_USER=<your-email-address>
    EMAIL_PASS=<your-email-password>
    SMS_API_KEY=<your-sms-api-key>
    ```

4. **Start the development server:**

    - For the backend:

        ```bash
        cd backend
        npm server.js
        ```

    - For the frontend:

        ```bash
        cd frontend
        npm run dev
        ```


## API Endpoints
- Base URL for backend - http://localhost:3000/
- Base URL for frontend - http://localhost:5173/
- GET /flights/status - Fetch flight status by flight code.
- POST /api/notifications** - Trigger notifications for changes in flight data (handled internally).

## Contributing

Contributions are welcome! Please submit issues or pull requests to the repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact Ashutosh Tiwari(work.withashutosh1807@gmail.com).

