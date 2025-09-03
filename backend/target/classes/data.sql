-- Insert default users
INSERT INTO users (username, email, password, first_name, last_name, role, enabled) VALUES
('admin', 'admin@university.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin', 'User', 'ROLE_ADMIN', true),
('teacher', 'teacher@university.edu', '1234', 'John', 'Teacher', 'ROLE_TEACHER', true),
('student', 'student@university.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Jane', 'Student', 'ROLE_STUDENT', true);

-- Insert sample courses
INSERT INTO courses (code, title, description, credits, teacher_id) VALUES
('CS101', 'Introduction to Computer Science', 'Fundamental concepts of computer science and programming', 3, 2),
('MATH101', 'Calculus I', 'Introduction to differential and integral calculus', 4, 2),
('ENG101', 'English Composition', 'Basic writing and communication skills', 3, 2);
