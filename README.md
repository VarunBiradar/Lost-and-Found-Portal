# Lost and Found Portal

![Java](https://img.shields.io/badge/Java-17-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Vite](https://img.shields.io/badge/Vite-latest-purple.svg)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue.svg)

A full-stack web application designed to help users report lost items and claim found items. It features a modern, responsive UI and a secure RESTful backend.


## 🚀 Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Report Lost Items**: Users can create listings for items they have lost, including details like location and description.
- **Browse & Claim Items**: A centralized feed allowing users to browse found items and securely claim them.
- **Modern UI/UX**: Built with a premium, dark-themed glassmorphism aesthetic for an intuitive user experience.
- **RESTful API**: Fast and scalable backend powered by Spring Boot.

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **React Router DOM**
- **CSS3** (Glassmorphism & modern design principles)

### Backend
- **Java 17**
- **Spring Boot 3.2.5** (Web, Data JPA, Security)
- **JWT** (io.jsonwebtoken)
- **Lombok**

### Database
- **MySQL** (Primary Database)
- **H2 Database** (Runtime/Development)

## 📁 Project Structure

```text
Lost-and-Found-Portal/
├── backend/          # Java Spring Boot REST API
├── frontend/         # React + Vite client-side application
└── database/         # Database related resources
```

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- Java Development Kit (JDK) 17
- Maven
- MySQL Server

### 1. Database Configuration
1. Ensure your local MySQL server is running.
2. Create a new database for the application (e.g., `lost_and_found`).
3. Update the `application.properties` (or `.yml`) file in `backend/src/main/resources/` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/lost_and_found
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

### 2. Backend Setup
Navigate to the `backend` directory and run the Spring Boot application using Maven:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend API should now be running (usually on `http://localhost:8080`).

### 3. Frontend Setup
Open a new terminal window, navigate to the `frontend` directory, install the required packages, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The frontend application will typically be accessible at `http://localhost:5173`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🚀 Uploading to GitHub

If you want to upload this project to your GitHub repository, follow these steps:

1. Initialize a Git repository in the root folder:
   ```bash
   git init
   ```
2. Add all files to the staging area:
   ```bash
   git add .
   ```
3. Commit your changes:
   ```bash
   git commit -m "Initial commit: Lost and Found Portal"
   ```
4. Link it to your remote GitHub repository and push:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

## 📝 License

This project is open-source and available under the terms of the MIT License.
