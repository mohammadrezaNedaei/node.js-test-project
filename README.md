# Task Management API

A RESTful API for managing tasks, built with Node.js, Express, TypeScript, and MongoDB. This project is a learning exercise to explore Node.js and Express after working with NestJS, implementing CRUD operations for tasks stored in a MongoDB database.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, and delete tasks.
- Paginated task retrieval with `skip` and `take` query parameters.
- Persistent storage using MongoDB.
- TypeScript for type safety.
- Express for simplified routing and middleware.

## Tech Stack

- **Node.js**: Backend runtime.
- **Express**: Web framework for HTTP requests and routing.
- **TypeScript**: Adds type safety to JavaScript.
- **MongoDB**: NoSQL database for task storage.
- **Mongoose**: ODM for MongoDB schema and queries.
- **dotenv**: Manages environment variables.

## Project Structure
<pre>
firsttry/
├── dist/                        # Compiled JavaScript files
├── src/
│   ├── database/
│   │   └── db.ts                # MongoDB connection setup
│   ├── tasks/
│   │   ├── tasks.controller.ts  # Route handlers for task endpoints
│   │   ├── tasks.model.ts       # Mongoose schema and model for tasks
│   │   ├── tasks.service.ts     # Business logic for task operations
│   └── app.ts                   # Main Express application setup
├── .env                         # Environment variables (not tracked)
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
</pre>
## Prerequisites

- **Node.js**: v18.x or higher
- **MongoDB**: Local instance or cloud (e.g., MongoDB Atlas)
- **Git**: For cloning the repository
- **npm**: Node.js package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/firsttry.git
   cd firsttry


Install dependencies:
```bash
npm install
```

Create a .env file in the root directory:
```.env
MONGODB_URI=mongodb://localhost:27017/taskdb
```
Replace mongodb://localhost:27017/taskdb with your MongoDB connection string (e.g., MongoDB Atlas URI).


Running the Application

Compile TypeScript:
```bash
npx tsc
```

Start the server:
```bash
npm start
```
Or, for development with ts-node:
```bash
npx ts-node src/app.ts
```

The server runs at http://localhost:3000. Logs will show:
```bash
Connected to MongoDB
Server running at http://localhost:3000
```


## API Endpoints

Method<br/>
Endpoint<br/>
Description<br/>
Query Parameters / Body<br/>



GET<br/>
/tasks<br/>
Get all tasks (paginated)<br/>
skip (optional), take (optional)<br/>


GET<br/>
/task<br/>
Get a task by ID<br/>
id (required)<br/>


POST<br/>
/task<br/>
Create a new task<br/>
{ "title": "Task title" } (JSON body)<br/>


DELETE<br/>
/deleteTask<br/>
Delete a task by ID<br/>
id (required)<br/>


Example Requests

Get all tasks:<br/>
curl http://localhost:3000/tasks?skip=0&take=10
<pre>
{
  "tasks": [{ "id": 6807eac37170ae76ec0f5f32, "title": "Task 1" }, ...],
  "totalCount": 5
} 
</pre>


Get a task:<br/>
curl http://localhost:3000/task?id=1
<pre>
{ "task": { "id": 6807eac37170ae76ec0f5f32, "title": "Task 1" } }
</pre>


Create a task:<br/>
curl -X POST -H "Content-Type: application/json" -d '{"title":"New Task"}' http://localhost:3000/task
<pre>
{ "task": { "id": 6807eac37170ae76ec0f5f33, "title": "New Task" } }
</pre>


Delete a task:<br/>
curl -X DELETE http://localhost:3000/deleteTask?id=1
<pre>
{ "task": { "id": 6807eac37170ae76ec0f5f32, "title": "Task 1" } }
</pre>



Contributing

Fork the repository.
Create a feature branch:git checkout -b feature/your-feature


Commit changes:git commit -m 'Add your feature'


Push to the branch:git push origin feature/your-feature


Open a Pull Request.

Please follow the existing code style and include tests if applicable.
License
ISC License```
