# Ansar Humanitarian Relief Web Application

A full-stack MERN (MongoDB, Express, React, Node.js) web application for Ansar Humanitarian Relief organization.

## Project Structure

The project is organized into two main directories:

- `client`: Frontend React application
- `server`: Backend Express API with MongoDB

## Features

- User authentication and authorization
- Campaign management and donations
- Project showcase and tracking
- Sponsorship programs
- Sadaqah donations
- Admin dashboard
- Media uploads
- Payment processing
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/ansar-webapp.git
cd ansar-webapp
```

### Setup Backend

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the example:

```bash
cp env.example .env
```

4. Update the `.env` file with your MongoDB URI and other configuration.

5. Seed the database with initial data:

```bash
npm run seed
```

6. Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

### Setup Frontend

1. Navigate to the client directory:

```bash
cd ../client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your API URL:

```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000` by default.

## API Documentation

The API documentation is available at `http://localhost:5000/api/docs` when the server is running.

### Main API Endpoints

- Authentication: `/api/auth`
- Campaigns: `/api/campaigns`
- Donations: `/api/donations`
- Projects: `/api/projects`
- Sponsorships: `/api/sponsorships`
- Sadaqah: `/api/sadaqah`
- Categories: `/api/categories`
- Users: `/api/users`
- Admin: `/api/admin`
- File Uploads: `/api/upload`

## Deployment

### Backend Deployment

1. Set up a MongoDB database on a cloud provider (MongoDB Atlas, etc.).
2. Configure environment variables for production.
3. Build and deploy the Node.js application.

### Frontend Deployment

1. Build the React application:

```bash
cd client
npm run build
```

2. Deploy the `build` directory to your web hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ansar Humanitarian Relief Organization
- All contributors to this project
