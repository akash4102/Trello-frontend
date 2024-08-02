
# Trello Clone Project

This is a simple Trello clone application built with React and Node.js. It provides a task management system where users can create, update, and delete tasks within various projects. The application uses React for the front-end and a Node.js/Express server for the back-end with MongoDB for data persistence.

## Features

- **User Authentication:** Users can register and log in to access their project boards.
- **Project Management:** Create, view, and delete projects.
- **Task Management:** Add tasks with details like name, description, due date, status, and assigned users.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.
- **Data Validation:** Form inputs are validated to ensure data integrity.

## Technologies Used

- **Frontend:** React, React-Bootstrap, React Router, React Hook Form
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **HTTP Client:** Axios

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/trello-clone.git
   cd trello-clone
   ```

2. **Install dependencies:**

   - **Frontend:**

     ```bash
     cd client
     npm install
     ```

   - **Backend:**

     ```bash
     cd server
     npm install
     ```

3. **Environment Variables:**

   Create a `.env` file in the server directory with the following variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**

   - **Backend:**

     ```bash
     cd server
     npm start
     ```

   - **Frontend:**

     ```bash
     cd client
     npm start
     ```

   The application should now be running on `http://localhost:3000`.

## Usage

- Register a new account or log in with existing credentials.
- Create a new project from the dashboard.
- Add tasks to your project, specifying details such as task name, description, and due date.
- Manage tasks by updating their status or deleting them if necessary.

## Screenshots

![Dashboard](screenshot1.png)
![Project Details](screenshot2.png)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [Your Name](mailto:your-email@example.com).
