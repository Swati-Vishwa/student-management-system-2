# Student Management System

A full-stack web application designed to streamline student record management with a modern, responsive interface and robust backend architecture.

---

## Overview

The Student Management System provides educational institutions and administrators with an efficient platform to maintain and organize student information. Built with contemporary web technologies, it delivers a seamless user experience coupled with reliable data persistence.

---

## Features

- **Student Registration** – Add new student records to the system with comprehensive information capture
- **Record Management** – View, search, and organize student data efficiently
- **Update Operations** – Modify and maintain accurate student information in real-time
- **Safe Deletion** – Remove records with proper data handling protocols
- **RESTful API Architecture** – Clean, standard-compliant backend endpoints for all operations
- **Responsive Design** – Optimized user interface for multiple devices and screen sizes

---

## Technology Stack

### Frontend
- **React.js** – Component-based UI library
- **Tailwind CSS** – Utility-first CSS framework for styling
- **JavaScript (ES6+)** – Core scripting language

### Backend
- **Node.js** – JavaScript runtime environment
- **Express.js** – Minimalist web framework
- **MongoDB** – NoSQL database for data persistence
- **Mongoose** – Object Data Modeling (ODM) library

---

## Project Structure

```
full-stack-development-internship-tasks/
└── student-management-system-2/
    ├── client/                 # React frontend application
    │   ├── src/
    │   ├── public/
    │   └── package.json
    └── server/                 # Node.js/Express backend
        ├── models/             # Database models
        ├── routes/             # API endpoints
        ├── controllers/        # Business logic
        ├── .env                # Environment variables
        └── package.json
```

---

## Prerequisites

Before installing this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git**
- **MongoDB** (local or cloud instance)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/full-stack-development-internship-tasks.git
cd full-stack-development-internship-tasks/student-management-system-2
```

### 2. Backend Configuration

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the server root with the following variables:
cat > .env << EOF
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
EOF

# Start the development server
npm run dev
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Configuration

```bash
# Open a new terminal and navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run start
```

The frontend will automatically open at `http://localhost:3000`

---

## API Endpoints

### Students Resource

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/students` | Retrieve all student records |
| `GET` | `/api/students/:id` | Retrieve a specific student |
| `POST` | `/api/students` | Create a new student record |
| `PUT` | `/api/students/:id` | Update a student record |
| `DELETE` | `/api/students/:id` | Delete a student record |

---

## Development Workflow

### Phase 1: Frontend Development
- Designed responsive user interfaces using React component architecture
- Implemented styling with Tailwind CSS for consistent, modern aesthetics
- Created reusable components for improved maintainability

### Phase 2: Backend Development
- Developed RESTful API endpoints following HTTP standards
- Implemented CRUD operations with proper error handling
- Established database models using Mongoose schemas

### Phase 3: Integration & Database
- Configured secure MongoDB connection with Mongoose ODM
- Implemented data validation and error handling
- Ensured data persistence and retrieval

### Phase 4: Testing & Deployment
- Verified CRUD operations across all workflows
- Tested API endpoints for reliability and performance
- Validated frontend-backend integration

---

## Available Scripts

### Server

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run backend tests (if configured)
```

### Client

```bash
npm start        # Launch development server
npm run build    # Create production build
npm test         # Run frontend tests (if configured)
```

---

## Environment Variables

Create a `.env` file in the `server` directory with the following configuration:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

---

## Best Practices Implemented

- **Separation of Concerns** – Frontend and backend are independently organized
- **RESTful Principles** – Standard HTTP methods and status codes
- **Error Handling** – Comprehensive error management and user feedback
- **Code Organization** – Modular structure for scalability
- **Security** – Environment variables for sensitive data protection

---

## Author

**Swati Vishwakarma**  
Frontend Developer | Full-Stack Developer 

---

## License

This project is provided as part of the Full-Stack Development Internship program.

---

## Support

For issues, questions, or contributions, please open an issue in the repository or contact the project maintainer.