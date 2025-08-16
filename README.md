# Expense Tracker 📊

A full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js) that helps users track and visualize their expenses.

## Features ✨

- **User Authentication**: Secure login and registration system
- **Expense Management**: Create, read, update, and delete expense records
- **Categorization**: Organize expenses by predefined categories
- **Filtering & Sorting**: Filter expenses by date range and category
- **Data Visualization**: View expense distribution with interactive charts
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack 🛠️

### Backend

- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Joi for data validation
- Security: Helmet, Rate Limiting, CORS

### Frontend

- Next.js 15 (React framework)
- TypeScript for type safety
- React Hook Form for form handling
- Zod for schema validation
- Recharts for data visualization
- TailwindCSS for styling

## Project Structure 📂

```
expense-tracker/
├── backend/ # Backend server code
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Custom middleware
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions
│ └── server.js # Express app entry point
│
└── frontend/ # Next.js frontend
├── app/ # Next.js app directory
├── components/ # React components
├── lib/ # Utility functions
├── public/ # Static assets
└── types/ # TypeScript type definitions
```

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the backend directory with:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env.local file in the frontend directory with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser
