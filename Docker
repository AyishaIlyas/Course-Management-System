# Stage 1: Build frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build backend
FROM maven:3.9.2-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/ .
RUN mvn clean package -DskipTests

# Stage 3: Run backend and serve frontend
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy backend JAR (replace 'course-management-0.0.1-SNAPSHOT.jar' with your actual JAR name from pom.xml)
COPY --from=backend-build /app/backend/target/course-management-0.0.1-SNAPSHOT.jar app.jar

# Copy frontend build to Spring Boot's static resources
COPY --from=frontend-build /app/frontend/build ./resources/static

# Expose port (Render will override with PORT env variable)
EXPOSE 8080

# Start backend
ENTRYPOINT ["java", "-jar", "app.jar"]