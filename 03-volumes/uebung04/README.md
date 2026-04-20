## Automatisches Aktualisieren einer Webseite

<!-- mit Node.js und npm in einem Docker-Container (mit nodemon und live-server) -->

### Ziel

Sie sollen eine Node.js-Anwendung erstellen, die eine einfache Webseite
bereitstellt. Sie werden den lokalen Source-Code in einen Docker-Container
mounten.

### Schritte

#### 1. Erstellen Sie einen lokalen Ordner für die Node.js-Anwendung:

- Erstellen Sie einen neuen Ordner mit dem Namen `my_node_app` auf Ihrem
  Host-System, der die Node.js-Anwendung enthalten wird.

#### 2. Initialisieren Sie ein neues Node.js-Projekt:

- Erstellen Sie in dem Ordner eine Datei `package.json` mit folgendem Inhalt:

```json title="package.json"
{
  "name": "my_node_app",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

#### 3. Erstellen Sie die Server-Datei:

- Erstellen Sie eine Datei namens `server.js` mit folgendem Inhalt:

```javascript title="server.js"
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

#### 4. Erstellen Sie den Ordner für statische Dateien:

Erstellen Sie im Ordner `my_node_app` einen Unterordner namens `public` und in
diesem Ordner wiederum eine HTML-Datei namens `index.html` mit folgendem Inhalt:

```html title="my_node_app/public/index.html"
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

#### 5. Optional: App auf Host starten:

- Sofern Sie `node` und `npm` installiert habt, könnt ihr mit folgenden Befehlen
  die Applikation auf dem Host starten.
- Fall nicht, kein Problem, wir starten später die Applikation im Docker
  Kontext!

```bash
npm install
npm run start
```

Nach dem Start sollte die Webseite mit `http://localhost:3000` aufrufbar sein.

#### 6. Erstellen Sie ein Dockerfile:

- Erstellen Sie eine Datei namens `Dockerfile` **im Verzeichnis `my_node_app`**
  mit folgendem Inhalt:

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

# Starten Sie die Anwendung
CMD ["npm", "start"]
```

#### 7. Bauen Sie das Docker-Image:

- Führen Sie den folgenden Befehl im Ordner `my_node_app` aus, um das
  Docker-Image zu erstellen:

```bash
docker buildx build -t my_node_app .
```

#### 8. Starten Sie den Docker-Container mit dem gemounteten Source-Code:

- Starten Sie den Container und mounten Sie den lokalen Ordner in den Container.
  Verwenden Sie den folgenden Befehl:

```bash
docker run -it --rm --name my_node_app_container -p 3000:3000 -p 3001:3001 -v .:/usr/src/app my_node_app
```

:::tip

Wenn Sie einem Container einen expliziten Namen geben, starten Sie ihn doch mit
`--rm`. Ohne dies müssen Sie immer manuell den Container wieder löschen nach
einem Stoppen.

:::

#### 9. Überprüfen Sie die Anwendung im Browser:

- Öffnen Sie einen Webbrowser und gehen Sie zu
  [http://localhost:3000](http://localhost:3000). Sie sollten die Nachricht
  **"Willkommen zu meiner Node.js App!"** sehen.

#### 10. Ändern Sie die HTML-Datei und beobachten Sie die Aktualisierung:

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

- Speichern Sie die Datei und laden Sie die Seite neu.
- Nun sollten die Änderungen übernommen worden Sein.

:::info

- Für die die Node nicht auf dem Host installiert hatten zeigt dies
  eindrücklich, dass durch Docker die Programmiersprachen und Co. nicht Lokal
  vorhanden sein müssen.

:::

#### 11. Beenden Sie den Docker-Container:

- Um den Container zu stoppen, drücken Sie `Ctrl + C` im Terminal, in dem der
  Container läuft. Alternativ können Sie den Container auch mit folgendem Befehl
  stoppen:

```bash
docker stop my_node_app_container
```

#### 12. Container und Image aufräumen:

- Wenn Sie mit der Übung fertig sind und die Ressourcen freigeben möchten,
  können Sie den Container und das Image entfernen:

```bash
docker rm my_node_app_container
docker rmi my_node_app
```
