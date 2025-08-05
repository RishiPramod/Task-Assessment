# Todo App

A simple and intuitive Todo application that helps you stay organized and manage your tasks efficiently. This project was built to demonstrate proficiency in building modern web applications with a focus on clean code, user experience, and seamless functionality.

## Live Demo

The application is deployed on Vercel and can be accessed here: [Todo App](https://task-assessment-swab.vercel.app)

## Features

*   **User Authentication:** Secure user registration and login functionality.
*   **CRUD Operations:** Create, Read, Update, and Delete tasks with ease.
*   **Task Management:** Organize your tasks with categories (Personal, Work, Shopping).
*   **Filtering and Search:** Quickly find tasks with a powerful search and category filter.
*   **Pagination:** Navigate through your tasks with a simple pagination system.
*   **Responsive Design:** A clean and modern UI that works on all devices.
*   **Toast Notifications:** Instant feedback for user actions like login, registration, and errors.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/RishiPramod/Task-Assessment.git
    ```

2.  **Navigate to the Project Directory**
    ```bash
    cd Task-Assessment
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    npm run install-all
    ```

4.  **Set Up Environment Variables**

    #### For the Client:
    Create a `.env` file in the `client` directory and add the following:
    ```bash
    VITE_HOST_URL=http://localhost:3000/api/v1
    ```

    #### For the Server:
    Create a `.env` file in the `server` directory and add the following:
    ```bash
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

5.  **Run the Application**
    In the root directory, run:
    ```bash
    npm run start
    ```
    This will start both the client and server concurrently.

## Schema Design

The application uses a simple schema for the `Task` object:

```javascript
const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide name'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    category: {
      type: String,
      enum: ['Personal', 'Work', 'Shopping', 'Other'],
      default: 'Other',
    },
  },
  { timestamps: true }
);
```

## Module & Class Structure

The project is organized into two main directories: `client` and `server`.

### Server
The server follows a standard Node.js structure:
*   **`config`**: Contains the database connection configuration.
*   **`controllers`**: Handles the business logic for each route.
*   **`middlewares`**: Contains custom middleware for authentication and error handling.
*   **`models`**: Defines the Mongoose schemas for the `User` and `Task` objects.
*   **`routes`**: Defines the API routes for authentication and tasks.

### Client
The client is a React application with the following structure:
*   **`components`**: Contains all the React components used in the application.
*   **`slices`**: Contains the Redux Toolkit slices for managing state (auth, tasks).
*   **`store.js`**: The Redux store configuration.

## AI Prompts Used

Throughout the development of this project, I utilized an AI assistant to help with various tasks. Here are some of the prompts I used and why:

*   **Project Scaffolding**
    > I need to build a MERN stack application. The application will be a Todo app with user authentication. Please provide me with the basic folder structure and the necessary dependencies for both the client and the server.
    *   **Why:** This prompt was used to get a basic understanding of the project structure and the necessary dependencies to get started.

*   **Backend Development**
    > Create an Express server with a connection to a MongoDB database. The server should have two main routes: one for user authentication (login and register) and one for managing tasks (CRUD operations). Use JWT for authentication.
    *   **Why:** This prompt was used to generate the basic boilerplate code for the server, including the database connection, authentication, and task routes.

*   **Frontend Development**
    > Create a React application using Vite and Redux Toolkit. The application should have a login page, a register page, and a task manager page. The task manager page should be a protected route.
    *   **Why:** This prompt was used to generate the basic boilerplate code for the client, including the necessary components, routes, and state management setup.

*   **Initial Feature Implementation**
    > I want you to add some features in this first one being an edit in the todo then a dropdown besides the todo creation input so can add some category or tag to the task. then some basic filtering + search + pagination add better error handling, use react-hot-toast at time of signup or login if possible improve the ui more, make better looking, I have already modified the server code and the redux api and tasksSlice, now i want those chnages to reflect on the frontend
    *   **Why:** This was the initial prompt to kick off the development of the new features. It provided the AI with a clear understanding of the requirements and the existing codebase.

*   **UI Improvement for Dropdowns**
    > the dropdown for filter as well as while adding todo, imrove their styiling a bit
    *   **Why:** After the initial implementation, I wanted to refine the UI of the dropdown menus to make them more visually appealing and consistent with the rest of the application.

## Test Plan

### Positive Test Cases
*   **User Registration:** A new user can successfully register with a unique username and email.
*   **User Login:** A registered user can successfully log in with their credentials.
*   **Create Task:** A logged-in user can create a new task with a name and category.
*   **Read Tasks:** A logged-in user can view a list of their tasks.
*   **Update Task:** A logged-in user can edit the name and category of a task.
*   **Delete Task:** A logged-in user can delete a task.
*   **Filtering:** The task list can be filtered by category.
*   **Search:** The task list can be searched by name.
*   **Pagination:** The task list is paginated, and the user can navigate between pages.

### Negative Test Cases
*   **User Registration:** A user cannot register with an existing username or email.
*   **User Login:** A user cannot log in with incorrect credentials.
*   **Create Task:** A user cannot create a task with an empty name.
*   **Access Control:** A user cannot view, edit, or delete tasks created by another user.

### Edge Cases
*   **Empty Task List:** The application should display a message when there are no tasks to show.
*   **No Search Results:** The application should display a message when no tasks match the search query.
*   **Invalid Input:** The application should handle invalid input gracefully and display appropriate error messages.

## Future Improvements

If I had more time, I would focus on the following improvements:
*   **Real-Time Updates:** Implement WebSockets to provide real-time updates to the task list.
*   **Drag and Drop:** Allow users to reorder tasks using drag and drop.
*   **Due Dates and Reminders:** Add the ability to set due dates and receive reminders for tasks.
*   **Themes:** Allow users to customize the look and feel of the application with different themes.
*   **Unit and Integration Tests:** Write a comprehensive suite of unit and integration tests to ensure the application is robust and reliable.

## Tech Stack

*   **Frontend:** React, Redux Toolkit, Tailwind CSS, Vite
*   **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
*   **Deployment:** Vercel
