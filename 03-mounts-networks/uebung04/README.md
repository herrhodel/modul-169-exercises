## Automatisches Aktualisieren einer Webseite

<!-- mit Node.js und npm in einem Docker-Container (mit nodemon und live-server) -->

### Ziel

Sie sollen eine Node.js-Anwendung erstellen, die eine einfache Webseite
bereitstellt. Sie werden den lokalen Source-Code in einen Docker-Container
mounten und `nodemon` sowie live-server verwenden, um die Webseite automatisch
zu aktualisieren, wenn Änderungen am Code, einschließlich HTML-Dateien,
vorgenommen werden.

### Schritte

#### 1. Erstellen Sie einen lokalen Ordner für die Node.js-Anwendung:

- Erstellen Sie einen neuen Ordner mit dem Namen my_node_app auf Ihrem
  Host-System, der die Node.js-Anwendung enthalten wird.

#### 2. Initialisieren Sie ein neues Node.js-Projekt:

- Führen Sie den folgenden Befehl im eben erstellten Ordner aus, um ein neues
  Node.js-Projekt zu initialisieren:

```bash
npm init -y
```

#### 3. Installieren Sie die erforderlichen Pakete:

- Installieren Sie express, `nodemon` und `live-server`:

```bash
npm install express
npm install --save-dev nodemon live-server
```

#### 4. Erstellen Sie die Server-Datei:

- Erstellen Sie eine Datei namens `server.js` mit folgendem Inhalt:

```javascript
const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "public")));

// Routen definieren
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
```

#### 5. Erstellen Sie den Ordner für statische Dateien:

Erstellen Sie in my_node_app einen Ordner namens public und in diesem Ordner
eine HTML-Datei namens index.html mit folgendem Inhalt:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Node.js App</title>
  </head>

  <body>
    <h1>Willkommen zu meiner Node.js App!!</h1>
  </body>
</html>
```

#### 6. Aktualisieren Sie das `package.json`:

- Fügen Sie ein Skript für `nodemon` und `live-server` in die Datei
  `package.json` ein und konfigurieren Sie `nodemon`, um HTML-Dateien zu
  überwachen:

```json title="package.json > scripts part"
"scripts": {
  "start": "nodemon server.js",
    "live": "live-server public --port=3001 --no-browser"
  }
},
```

#### 7. Erstellen Sie ein Dockerfile:

- Erstellen Sie eine Datei namens `Dockerfile` im Verzeichnis `my_node_app` mit
  folgendem Inhalt:

```Dockerfile
# Verwenden Sie das offizielle Node.js-Image
FROM node:18

# Setzen Sie das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopieren Sie die package.json und package-lock.json
COPY package\*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Codes
COPY . .

# Exponieren Sie die Ports
EXPOSE 3000
EXPOSE 3001

# Starten Sie die Anwendung
CMD ["npm", "start"]
```

#### 8. Bauen Sie das Docker-Image:

- Führen Sie den folgenden Befehl aus, um das Docker-Image zu erstellen:

```bash
docker buildx build -t my_node_app .
```

#### 9. Starten Sie den Docker-Container mit dem gemounteten Source-Code:

- Starten Sie den Container und mounten Sie den lokalen Ordner in den Container.
  Verwenden Sie den folgenden Befehl:

```bash
docker run -it --name my_node_app_container -p 3000:3000 -p 3001:3001 -v /tmp/my_node_app:/usr/src/app my_node_app
```

#### 10. Überprüfen Sie die Anwendung im Browser:

- Öffnen Sie einen Webbrowser und gehen Sie zu
  [http://localhost:3000](http://localhost:3000). Sie sollten die Nachricht
  **"Willkommen zu meiner Node.js App!"** sehen.

#### 11. Starten Sie live-server:

- Öffnen Sie ein neues Terminalfenster (oder eine neue Terminal-Session) und
  navigieren Sie zu Ihrem Projektverzeichnis:

```bash
cd my_node_app
```

- Führen Sie den folgenden Befehl aus, um `live-server` zu starten:

```bash
npm run live
```

- live-server wird nun auf **Port 3001** laufen und die Dateien im Ordner
  `public` überwachen.

#### 12. Überprüfen Sie die Anwendung im Browser:

- Öffnen Sie einen Webbrowser und gehen Sie zu http://localhost:3001. Sie
  sollten die Nachricht **"Willkommen zu meiner Node.js App!"** sehen.

#### 13. Ändern Sie die HTML-Datei und beobachten Sie die Aktualisierung:

- Öffnen Sie die Datei `public/index.html` in einem Texteditor und ändern Sie
  den Inhalt, z.B.:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Node.js App</title>
  </head>

  <body>
    <h1>Willkommen zu meiner aktualisierten Node.js App!</h1>
  </body>
</html>
```

- Speichern Sie die Datei. Der `live-server` sollte automatisch erkennen, dass
  die Datei geändert wurde, und die Seite im Browser neu laden.

#### 14. Beenden Sie den Docker-Container:

- Um den Container zu stoppen, drücken Sie `Ctrl + C` im Terminal, in dem der
  Container läuft. Alternativ können Sie den Container auch mit folgendem Befehl
  stoppen:

```bash
docker stop my_node_app_container
```

#### 15. Optional: Container und Image aufräumen:

- Wenn Sie mit der Übung fertig sind und die Ressourcen freigeben möchten,
  können Sie den Container und das Image entfernen:

```bash
docker rm my_node_app_container
docker rmi my_node_app
```
