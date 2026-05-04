## Kein Root User verwenden

### Ziel

In dieser Übung geht des darum ein `Dockerfile`, welches den USER `root`
verwendet so umzubauen, dass der Container mit einem USER `appuser` arbeitet,
welcher nur Schreibrecht auf das `WORKDIR` "/app" hat.

### Schritte

1. Erstellen Sie eine Datei mit dem Namen `package.json` und kopieren Sie den
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

2. Kreieren Sie die Datei für den Server mit dem Namen `server.js` und kopieren
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

3. Erstellt ein `Dockerfile` mit folgendem Inhalt:

```Dockerfile
FROM node:24
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
```

12. Baut das Image und startet es und öffnet http://localhost:3000 im Browser
    - `docker build -t security:with-root .`
    - `docker run --rm -d -p 3000:3000 --name with-root security:with-root`.
13. Öffnet eine Shell im Container mit `docker exec -it with-root /bin/bash`.
14. Prüft den User mit dem Befehl `whoami`.
15. Stoppt den Container mit `docker stop with-root`.
16. Erstellt eine neue Datei `Dockerfile.noroot` und kopiert folgenden Inhalt
    hinein.

```Dockerfile title="Dockerfile.noroot"
FROM node:24
# Eigenen Benutzer und Gruppe anlegen und verwenden
RUN adduser --system --group --home /home/appuser appuser
WORKDIR /app
# Rechte setzen
RUN chown appuser:appuser /app
# User appuser verwenden
USER appuser
# Berechtigungen geben
COPY --chown=appuser:appuser package*.json ./
COPY --chown=appuser:appuser . .
RUN npm install
# App starten
CMD ["node", "server.js"]
```

12. Baut das Image erneut und startet es.
    - `docker build -f Dockerfile.noroot -t security:no-root .`
    - `docker run --rm -d -p 3000:3000 --name no-root security:no-root`.
13. Öffnet eine Shell im Container mit `docker exec -it no-root /bin/bash`.
14. Prüft den User mit dem Befehl `whoami`.
15. Stoppt den Container mit `docker stop no-root`
