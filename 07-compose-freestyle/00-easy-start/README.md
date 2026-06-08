## Apps containerisieren und Ausführen

In diesem Beispiel wird eine einfache API und ein Frontend-Webserver mit
Docker-Compose gebaut und gestartet.

### Struktur

Die Applikation besteht aus zwei Teilen, einer API und einem Frontend (UI). Die
jeweiligen Applikationen befinden sich in eigenen Ordnern (api/ und ui/).

```bash
.
├── api/
├── solution/ <- erst zur Prüfung anschauen!
├── ui/
└── README.md
```

#### API

Die API ist ein nodejs Applikation die mit folgenden Befehlen gestartet werden
kann.

```bash
npm install
node index.js
```

Die Applikation startet auf Port 3000

#### UI

Das UI besteht nur aus einer Datei, der `index.html`. Diese Datei soll mit einem
nginx Webserver auf Port 80 gestartet werden.

- Das Script auf der Webseite macht direkt einen Aufruf an die API via
  http://localhost:3000.

### Aufgabe

- Erstelle für Api und Ui jeweils ein Dockerfile.
  - Baue und starte diese einzeln.
  - Die API soll auf Port 3000 und das Frontend auf Port 80 laufen.
- Erstelle ein Docker-Compose File, welches die beiden Container zusammen
  startet.
  - Die API soll auf Port 3000 und das **Frontend auf Port 8070** laufen.
  - Der interne Port 80 vom Nginx muss auf 8070 gemappt werden.
  - Der interne Port 3000 der API bleibt gleich, muss aber verfügbar gemacht
    werden.
- Starte die Container mit `docker-compose up -d` und rufe die Webseite auf via
  http://localhost:8070
- Stoppe die Container mit `docker-compose down`.
