# Brainsily Backend

Brainsily is your second brain for organizing and accessing your favorite content. This backend service powers the application, enabling features like user authentication, content management, and sharing curated knowledge.

For the frontend source, please refer to [WebDev/Proj-Week-15-Brainsily-fe](../Proj-Week-15-Brainsily-fe/)

---

## Live Demo

Check out the live application here: [Brainsily Live](https://brainsily.vercel.app/)

---

## Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod for schema validation
- **Utilities**: dotenv for environment variables, bcrypt for password hashing, crypto-js for encryption

---

## Features

- **User Signup**: Create an user account with secure password hashing.
- **User Login**: Login and receive a JWT for authentication.
- **Get All Content**: Retrieve a list of courses created by the admin.
- **Create Content**: Add new content with details like title, body or link, content type like tweet, youtube.
- **Delete Content**: Delete content.
- **Share Brain**: Share your brain content by making it public.
- **View Shared Brain**: View shared brain content by given url.


Find API Doc in [endpoint.md](endpoints.md)

---

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the provided `env.example`:
   ```bash
   JWT_SECRET=<your_jwt_secret>
   MONGO_URL=<your_mongo_url>
   SHRD_SECRET=<your_shared_secret>
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. For development:
   ```bash
   npm run dev
   ```

The server runs on `http://localhost:3000` by default.

---

## Environment Variables

The application requires the following environment variables:

| Variable    | Description                |
|-------------|----------------------------|
| JWT_SECRET  | Secret key for user login JWT tokens  |
| MONGO_URL   | MongoDB connection string  |
| SHRD_SECRET | Secret for shared links    |

---

## Future Enhancements

- Implement categorization by Tags/Labels
- Add unit and integration tests.
- Implement rate limiting.
- Enhance error handling.

---

## Credits

Thanks to 
