# SkillSchool Backend API

A backend API for managing and selling online courses. This project demonstrates foundational principles of backend development using Node.js, Express, and MongoDB.

---

## Purpose

This project was built to:
- Understand the principles of backend development.
- Explore Node.js and libraries like Express, Mongoose, Zod, JWT, and bcrypt.
- Implement RESTful APIs for user authentication, course management, and secure access control.

---

## Tech Stack

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB with Mongoose**: Database and ODM for data modeling.
- **Zod**: Schema validation for request bodies.
- **JWT**: Token-based authentication.
- **bcrypt**: Password hashing for security.
- **dotenv**: For environment variable management.

---

## Features

### **Admin APIs**
- **Admin Signup**: Create an admin account with secure password hashing.
- **Admin Login**: Login and receive a JWT for authentication.
- **Create Courses**: Add new courses with details like name, price, description, and thumbnail.
- **Update Courses**: Modify existing course details.
- **View Owned Courses**: Retrieve a list of courses created by the admin.

### **User APIs**
- **User Signup & Login**: Secure user authentication.
- **Purchase Courses**: Users can purchase courses (to be detailed in `routes/user`).

### **Course APIs**
- **Get All Courses**: Fetch a list of all available courses (to be detailed in `routes/course`).

---

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed and set up:
- **Node.js** and **npm** installed on your system. ([Download Node.js](https://nodejs.org/))
- **MongoDB** database accessible via a connection URL.
- A `.env` file in the project root containing the following environment variables:
  ```env
  MONGO_URL=mongodb+srv://<your-connection-string>
  JWT_USER_SECRET=<your-user-secret>
  JWT_ADMIN_SECRET=<your-admin-secret>
  ```

### Installation
Follow these steps to set up and run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/course-selling-backend.git
   cd course-selling-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

The server will be running at [http://localhost:3000](http://localhost:3000).
