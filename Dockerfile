FROM adoptopenjdk:16-jre
COPY target/demo*   /app.jar
CMD java -jar /app.jar
