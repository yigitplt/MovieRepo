# Stage 1: Build the application using a Maven image that includes Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

# Build the application, skipping tests
RUN mvn clean package -DskipTests

# ---

# Stage 2: Create the final, smaller runtime image using a Java 21 JRE
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the application JAR from the build stage using a wildcard
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]