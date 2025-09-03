# Stage 1: Build
FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Copy Maven files from backend folder
COPY backend/pom.xml backend/mvnw ./
COPY backend/.mvn .mvn

# Copy source code
COPY backend/src src

# Build the JAR inside Docker
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
