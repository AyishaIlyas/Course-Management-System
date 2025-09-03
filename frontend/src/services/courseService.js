import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const courseService = {
  async getAllCourses() {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  },

  async getCourseById(id) {
    const response = await axios.get(`${API_URL}/courses/${id}`);
    return response.data;
  },

  async createCourse(courseData) {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
  },

  async updateCourse(id, courseData) {
    const response = await axios.put(`${API_URL}/courses/${id}`, courseData);
    return response.data;
  },

  async deleteCourse(id) {
    const response = await axios.delete(`${API_URL}/courses/${id}`);
    return response.data;
  },

  async getCoursesByTeacher(teacherId) {
    const response = await axios.get(`${API_URL}/courses/teacher/${teacherId}`);
    return response.data;
  }
};

export default courseService;
