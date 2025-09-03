# Stage 1: Build backend
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# Copy Maven wrapper and files
COPY backend/pom.xml backend/mvnw ./
COPY backend/.mvn/ .mvn/

# Copy source code
COPY backend/src/ src/

# Build the JAR
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the JAR from build stage
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
