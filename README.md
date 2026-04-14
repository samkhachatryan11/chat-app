# chat-app
A lightweight chat application focused on clarity and reliability. It provides a straightforward way to send messages and stay connected, without unnecessary complexity. Built with simplicity in mind, it aims to do its job reliably.

## Tech Stack

**Frontend**
- React.js
- TailwindCSS

**Backend**
- Nest.js
- PostgreSQL
- Redis

## Features

- Real-time messaging
- User authentication and session management
- One-to-one and group conversations
- Message persistence
- Typing indicators
- Online/offline presence
- Responsive UI for desktop and mobile
- Modular and scalable backend architecture

## Project Structure

```bash
.
├── frontend/          # React.js application
├── backend/           # Nest.js API
└── README.md

```
## Getting Started
### Prerequisites

Make sure you have the following installed:

- Node.js
- PostgreSQL
- Redis

Installation

Clone the repository:

```bash

git clone https://github.com/samkhachatryan11/chat-app
cd chat-app

```

Install dependencies for both frontend and backend:

```bash

# Frontend
cd frontend
yarn install

# Backend
cd ../backend
yarn install

```

## Environment Configuration

Environment variables are managed via `.env` files in both frontend and backend services.

Refer to the provided `.env.example` files in each service for the full list of required variables and their formats.

## Running the Application

**Backend**

```bash

cd backend
yarn run start:dev

```

**Frontend**

```bash

cd frontend
yarn run dev

```

## Architecture

The application follows a modular full-stack design:

- React.js provides the client interface and manages the chat experience.
- TailwindCSS is used for fast, consistent, and maintainable styling.
- Nest.js powers the API layer and application logic.
- PostgreSQL stores users, conversations, and messages.
- Redis supports caching, presence tracking, and real-time pub/sub workflows.

## License

This project is licensed under the MIT License.
