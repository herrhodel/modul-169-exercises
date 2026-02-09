## Übung 12

Nun erstellen wir einen Webserver mithilfe von _NodeJs_ und _ExpressJs_. Dies
soll der Nutzen von multistage Builds ein wenig deutlicher zeigen.

Wir kreieren zuerst ein _Dockerfile_ ohne Multistage Build, danach mit
Multistage Build, um den Unterschied untersuchen zu können.

- Erstellen Sie eine Datei mit dem Namen `package.json` und kopieren Sie den
  untenstehenden Inhalt hinein. In dieser Datei werden die Abhängigkeiten und
  weiteres gespeichert.

```json title="package.json"
{
  "name": "multistage-node-example",
  "version": "1.0.0",
  "description": "A simple Node.js web server using Express.js",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

- Kreieren Sie die Datei für den Server mit dem Namen `server.js` und kopieren
  Sie folgenden Code hinein:

```javascript title="server.js"
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(
    "Hello, World! This is a simple Node.js web server using Express.js."
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

- Nun erstellen wir das _Dockerfile_, in diesem Fall noch nicht als Multistage
  Build.

```Dockerfile
FROM node:14
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json ./
# Copy the rest of the application code
COPY server.js .
# Install dependencies
RUN npm install
# Expose the port the app runs on
EXPOSE 3000
# Command to run the application
CMD ["npm", "start"]
```

- Bilden Sie das Image mit dem Tag `-t uebung12`
- Erstellen Sie einen Container mit dem Befehl
  `docker run --rm -p 3000:3000 uebung12` und testen Sie den Webserver, indem
  Sie auf http://localhost:3000 gehen.
- Nun optimieren wir das Image, indem wir ein Multistage Build kreieren. Das
  heisst, wir verlagern die Installation der Abhängigkeiten in einen separaten
  Build Stage.
  - Kreieren Sie eine Datei mit dem Namen _Dockerfile.multistage_ und kopieren
    Sie den folgenden Inhalt hinein.

```Dockerfile title="Dockerfile.multistage"
# Stage 1: Build stage
FROM node:14 AS builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Copy the rest of the application code
COPY server.js ./
# Install dependencies
RUN npm install

# Stage 2: Production stage
FROM node:14-slim
# Set the working directory
WORKDIR /app
# Copy only the necessary files from the builder stage
COPY --from=builder /app .
# Expose the port the app runs on
EXPOSE 3000
# Command to run the application
CMD ["npm", "start"]
```

- Bilden Sie das Image mit dem Tag mit dem Befehl
  `docker buildx build -t uebung12ms -f Dockerfile.multistage .`.
  - Mit `-f Dockerfile.multistage` geben wir an, welches _Dockerfile_ verwendet
    werden soll.
- Vergleichen Sie die beiden _Dockerfiles_.
- Vergleichen Sie die beiden Images auf Grösse und Layers.
  - `docker inspect uebung12`
  - `docker inspect uebung12ms`
