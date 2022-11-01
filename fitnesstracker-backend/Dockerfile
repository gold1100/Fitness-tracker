FROM openjdk:17-alpine
ADD target/fitness-app-docker.jar fitness-app-docker.jar
ENTRYPOINT ["java", "-jar", "fitness-app-docker.jar"]
EXPOSE 8080