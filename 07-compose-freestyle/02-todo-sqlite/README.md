## ToDo-App mit SQLite und ReactJS

Diese Web-Applikation verwaltet ToDo-Items. Die Daten werden in einer SQLite
Datenbank gespeichert. Das Frontend wurde mit dem ReactJS-Framework realisiert.

### Struktur

Es besteht eine NodeJS Applikation inklusive `Dockerfile` im Ordner `app/`.

```bash
.
├── app/
├──── Dockerfile
├── solution/ <- erst zur Prüfung anschauen!
└── README.md
```

Bauen: `docker build -t todos:1.0 .` Starten:
`docker run -d -p 3000:3000 todos:1.0`

### Aufgabe

Erstelle ein Docker-Compose-File, das die Web-Applikation in einem Container
startet und den Port 3000 freigibt.

- Starte die Container mit `docker-compose up -d` und rufe die Webseite auf via
  http://localhost:3000
- Prüfen Sie die App unter `http://localhost:3000`
  - Erstelle Einträge
- Stoppe die Container mit `docker-compose down`.
- Starte die Container mit `docker-compose up -d` und rufe die Webseite auf via
  http://localhost:3000
- Prüfen Sie die App unter `http://localhost:3000`
  - Einträge sollten weg sein

Im Container wird die SQLite Datenbank in einem Verzeichnis `/etc/todos`
gespeichert. Erstelle ein Docker-Volume via Docker Compose und sorge dafür, dass
die Daten der SQLite Datenbank in das Volume geschrieben werden (Volume Mount).

- Starte die Container mit `docker-compose up -d` und rufe die Webseite auf via
  http://localhost:3000
- Prüfen Sie die App unter `http://localhost:3000`
  - Erstelle Einträge
- Stoppe die Container mit `docker-compose down`.
- Starte die Container mit `docker-compose up -d` und rufe die Webseite auf via
  http://localhost:3000
- Prüfen Sie die App unter `http://localhost:3000`
  - Einträge sollten noch da sein
