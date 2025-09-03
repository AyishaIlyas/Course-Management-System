# Use OpenJDK 17
FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Copy Maven files
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Copy source code
COPY src src

# Build the JAR inside Docker
RUN ./mvnw clean package -DskipTests

# Second stage: runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
