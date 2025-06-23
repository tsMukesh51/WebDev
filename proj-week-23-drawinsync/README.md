# DrawInSync

DrawInSync is a collaborative drawing web app, enabling multiple users to draw on the same board simultaneously. This backend handles user management, board creation, collaboration, and real-time synchronization.

---

## Live Demo

Check out the live application here: [DrawInSync Live](https://drawinsync.vercel.app/) *(Note: May be unavailable if still in development)*

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [Available Scripts](#available-scripts)
5. [Features](#features)
6. [Acknowledgements](#acknowledgements)

---

## **Project Overview**

DrawInSync is a collaborative web app where multiple users can draw on the same board simultaneously. It provides features like user authentication, board management, and real-time synchronization of Elements across all device active on the board.

This is a **practice project**, and the primary focus is on:
- Strengthening understanding System Design making trade offs.
- Utilizing modern technologies like Next.js, Express, PostgreSQL (Prisma), and WebSocket.
- Implementing modular and scalable project structures.

---

## **Project Architecture**

```mermaid
graph TD
    A[Client Request] --> B[Next.js API Routes]
    B --> C["Middleware<br>(Authentication & Validation)"]
    C --> D["Controllers<br>(API & WebSocket Handlers)"]
    D --> E["Services<br>(Business Logic)"]
    E --> F["PostgreSQL<br>(via Prisma)"]
    F --> G["Models<br>(User, Board, BoardCollaborator, Element)"]
    G --> E
    E --> D
    D --> H[Response/WebSocket Updates to Client]
    C --> H
    %% Styling for better readability
    classDef client fill:#f9f,stroke:#333,stroke-width:2px,color:#100c08;
    classDef server fill:#bbf,stroke:#333,stroke-width:2px,color:#100c08;
    classDef database fill:#bfb,stroke:#333,stroke-width:2px,color:#100c08;
    class A client;
    class B,C,D,E server;
    class F,G database;
```

The DrawInSync backend is a Next.js-based application integrated with Express for API routes and WebSocket for real-time drawing synchronization. It uses Prisma to manage PostgreSQL, with models for User, Board, BoardCollaborator, and Element. Middleware handles authentication and validation (via Zod), while services manage business logic. Data flows from client requests to PostgreSQL via Prisma, with WebSocket updates ensuring simultaneous drawing across users—all custom-built for this collaborative proof-of-concept.

---

## **Tech Stack**

- **Framework**: Next.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Real-Time**: WebSocket for synchronization
- **Validation**: Zod for schema validation
- **Utilities**: dotenv for environment variables
- **Monorepo**: TurboRepo for project management
- **Styling**: TailwindCSS (for potential backend UI or frontend integration)

---

## **Setup Instructions**

### Prerequisites
Ensure you have the following installed:
- Node.js (version 16 or higher)
- pnpm enabled
- PostgreSQL instance (local or cloud)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/tsMukesh51/WebDev.git
   cd ...WebDev/proj-week-23-drawinsync
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file based on the provided `env.example` in `packages/db`, `http-server`, `ws-server`:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/drawinsync
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

The http-server runs on `http://localhost:3000` by default.
The Next.js runs on `http://localhost:4200` by default.

---

## **Available Scripts**

### **`pnpm run dev`**
Runs the app in development mode using Next.js. The server will automatically reload for any changes.

### **`pnpm run build`**
Builds the app for production. The build artifacts will be output to the appropriate folder.

### **`pnpm run start`**
Starts the production server.

---

## **Features**

- **User Signup & Login**: Create and authenticate user accounts.
- **Board Creation**: Initialize a new drawing board with a unique slug.
- **Collaboration**: Manage collaborators with EDITOR or VIEWER roles.
- **Real-Time Drawing**: Synchronize drawing elements (RECTANGLE, CIRCLE, LINE) across users via WebSocket.
- **Element Management**: Store and update drawing shapes with properties.

Find API Doc in [endpoint.md](endpoint.md) *(to be created)*

---

## **Acknowledgements**

Special thanks to my mentor **[Kirat](https://github.com/hkirat)** for guiding me through the initial stages of this project and helping me understand backend development principles.

---
