FROM maven
WORKDIR /fitnesstracker-backend
COPY . .
RUN mvn clean install -DskipTests
CMD mvn spring-boot:run
EXPOSE 8080