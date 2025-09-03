FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# Copy backend files
COPY backend/pom.xml backend/mvnw ./
COPY backend/.mvn/ .mvn/
COPY backend/src src/

# Copy React build
COPY frontend/build backend/src/main/resources/static/

# Build JAR
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
