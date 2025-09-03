# University Course Management System

A full-stack web application for managing university courses, student enrollments, and academic records.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Role-Based Access**: Admin, Teacher, and Student roles with different permissions
- **Course Management**: CRUD operations for courses with teacher assignments
- **Student Enrollment**: Course registration and management
- **Grade Management**: Teachers can assign grades and scores to students
- **Academic Records**: Students can view their enrolled courses and results

### User Roles

#### Admin (ROLE_ADMIN)
- Manage all users (create, edit, delete)
- Manage all courses (create, edit, delete)
- View system statistics and reports
- Assign teachers to courses

#### Teacher (ROLE_TEACHER)
- View assigned courses
- Manage student grades and scores
- Upload course materials
- View course enrollments

#### Student (ROLE_STUDENT)
- Browse available courses
- Register for courses
- View enrolled courses
- Check academic results and grades

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.2.0**: Main framework
- **Spring Security**: Authentication and authorization
- **Spring Data JPA**: Data persistence
- **MySQL**: Database
- **JWT**: JSON Web Tokens for authentication
- **Maven**: Dependency management

### Frontend
- **React 18**: UI framework
- **React Router**: Client-side routing
- **React Bootstrap**: UI components
- **Axios**: HTTP client
- **Context API**: State management

## 📁 Project Structure


## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+
- Docker and Docker Compose (optional)



1. **Create MySQL database**
   ```sql
   CREATE DATABASE university_cms;
   ```

2. **Configure application.yml**
   Update database credentials in `backend/src/main/resources/application.yml`

3. **Run the backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

#### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/{id}` - Update course (Admin only)
- `DELETE /api/courses/{id}` - Delete course (Admin only)

### Enrollments
- `POST /api/enrollments/enroll` - Enroll student in course
- `GET /api/enrollments/student/{studentId}` - Get student enrollments
- `GET /api/enrollments/course/{courseId}` - Get course enrollments
- `PUT /api/enrollments/{id}/grade` - Update grade (Teacher/Admin)
- `DELETE /api/enrollments/{id}` - Remove enrollment

## 📊 Sample Data

### Default Users
- **Admin**: username: `admin`, password: `password`
- **Teacher**: username: `teacher`, password: `password`
- **Student**: username: `student`, password: `password`

### Sample Course
```json
{
  "code": "CS101",
  "title": "Introduction to Computer Science",
  "description": "Fundamental concepts of computer science and programming",
  "credits": 3
}
```


## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```



curl -X GET http://localhost:8080/api/courses \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Enroll in Course
```bash
curl -X POST "http://localhost:8080/api/enrollments/enroll?studentId=1&courseId=1" \
  -H "Authorization: Bearer <your-jwt-token>"
```

