import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseEnrollment from './pages/CourseEnrollment';
import CourseRegistration from './pages/CourseRegistration';
import Results from './pages/Results';
import AdminPanel from './pages/AdminPanel';
import TeacherPanel from './pages/TeacherPanel';
import StudentPanel from './pages/StudentPanel';
import AddUser from './pages/AddUser';
import CreateCourse from './pages/CreateCourse';
import SystemSettings from './pages/SystemSettings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute>
                  <CourseList />
                </ProtectedRoute>
              } />
              <Route path="/register-course" element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT']}>
                  <CourseRegistration />
                </ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT']}>
                  <Results />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/add-user" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AddUser />
                </ProtectedRoute>
              } />
              <Route path="/create-course" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <CreateCourse />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <SystemSettings />
                </ProtectedRoute>
              } />
              <Route path="/enrollment" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <CourseEnrollment />
                </ProtectedRoute>
              } />
              <Route path="/teacher" element={
                <ProtectedRoute allowedRoles={['ROLE_TEACHER']}>
                  <TeacherPanel />
                </ProtectedRoute>
              } />
              <Route path="/student" element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT']}>
                  <StudentPanel />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
