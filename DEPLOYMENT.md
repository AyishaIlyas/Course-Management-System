# Deployment Guide

## Quick Start with Docker

1. **Start the entire system:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - MySQL: localhost:3306

## Manual Deployment

### Backend
1. Build: `mvn clean package`
2. Run: `java -jar target/course-management-system-1.0.0.jar`

### Frontend
1. Install: `npm install`
2. Build: `npm run build`
3. Serve: `npm start`

## Environment Variables
- `SPRING_DATASOURCE_URL`: Database URL
- `JWT_SECRET`: JWT signing secret
- `REACT_APP_API_URL`: Backend API URL
