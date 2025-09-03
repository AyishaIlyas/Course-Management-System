package com.university.cms.repository;

import com.university.cms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    List<Course> findByTeacherId(Long teacherId);
    
    Course findByCode(String code);
    
    boolean existsByCode(String code);
}
