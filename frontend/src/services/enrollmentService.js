import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const enrollmentService = {
  async enrollStudent(studentId, courseId) {
    const response = await axios.post(`${API_URL}/enrollments/enroll`, null, {
      params: { studentId, courseId }
    });
    return response.data;
  },

  async getEnrollmentsByStudent(studentId) {
    const response = await axios.get(`${API_URL}/enrollments/student/${studentId}`);
    return response.data;
  },

  async getEnrollmentsByCourse(courseId) {
    const response = await axios.get(`${API_URL}/enrollments/course/${courseId}`);
    return response.data;
  },

  async updateGrade(enrollmentId, grade, score) {
    const response = await axios.put(`${API_URL}/enrollments/${enrollmentId}/grade`, null, {
      params: { grade, score }
    });
    return response.data;
  },

  async removeEnrollment(enrollmentId) {
    const response = await axios.delete(`${API_URL}/enrollments/${enrollmentId}`);
    return response.data;
  }
};

export default enrollmentService;
