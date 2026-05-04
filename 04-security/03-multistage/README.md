## Multistage Builds

Wir erstellen einen einfachen Webserver mithilfe von _NodeJs_ und _ExpressJs_.
Wenn eine (Web)-Applikation "dockerisiert" wird, gibt es immer zwei Schritte.

1. Im Ersten wird die Applikation gebaut (Pakete installiert, kompiliert und
   Co.).
   - Dafür braucht es häufig zusätzliche Pakete, welche nur zum Kompilieren
     gebraucht werden.
2. Im zweiten Schritt wird die fertige Applikation gestartet.
   - Dafür braucht es in der Regel nur noch die Programmiersprache, ohne
     zusätzliche Pakete, auf dem System.

Um den Nutzen zu veranschaulichen wird die Applikation zuerst als einfaches
`Dockerfile` "containerisiert". Danach wird das `Dockerfile` mit einem weiteren
"Build-Stage" erweitert, sodass das gebaute Image, nur noch die absolut
nötigsten Pakete beinhaltet.

Diese zwei Images werden schlussendlich verglichen.

### Schritte

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

```Dockerfile title="Dockerfile"
FROM node:24
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Copy the rest of the application code
COPY server.js .
# Install dependencies
RUN npm install
# Expose the port the app runs on
EXPOSE 3000
# Command to run the application
CMD ["npm", "start"]
```

- Bilden Sie das Image mit dem Tag `-t security:singlestage`
- Erstellen Sie einen Container mit folgendem Befehl und testen Sie den
  Webserver, indem Sie auf http://localhost:3000 gehen.
  - `docker run --rm -p 3000:3000 --name singlestage security:singlestage`
- Stoppen Sie den Container wieder mit `docker stop singlestage`.
- Nun optimieren wir das Image, indem wir ein Multistage Build kreieren. Das
  heisst, wir verlagern die Installation der Abhängigkeiten in einen separaten
  Build Stage.
  - Kreieren Sie eine Datei mit dem Namen _Dockerfile.multistage_ und kopieren
    Sie den folgenden Inhalt hinein.

```Dockerfile title="Dockerfile.multistage"
# Stage 1: Build stage
FROM node:24 AS builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Copy the rest of the application code
COPY server.js ./
# Install dependencies
RUN npm install

# Stage 2: Production stage
FROM node:24-slim
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
  `docker build -f Dockerfile.multistage -t security:multistage .`.
  - Mit `-f Dockerfile.multistage` geben wir an, welches _Dockerfile_ verwendet
    werden soll. Wenn nichts angegeben, sucht er ein `Dockerfile` ohne Endung.
- Erstellen Sie einen Container mit folgendem Befehl und testen Sie den
  Webserver, indem Sie auf http://localhost:3000 gehen.
  - `docker run --rm -p 3000:3000 --name multistage security:multistage`
  - **Achtung**: wenn der Container "singlestage" noch läuft, gibt es einen
    Portkonflikt!
- Vergleichen Sie die beiden _Dockerfiles_.
- Vergleichen Sie die beiden Images auf Grösse und Layers.
  - `docker inspect security:singlestage`
  - `docker inspect security:multistage`

:::tip

- Multistage Images sind nicht nur kleiner und dadurch performanter. Da sie
  weniger Abhängigkeiten beinhalten sind sie auch sicherer!

:::
