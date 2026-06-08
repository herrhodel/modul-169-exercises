## Python FastAPI mit Docker Compose builden und starten

### Struktur

Es besteht eine Python Applikation im Ordner `app/`.

```bash
.
├── app/
├── solution/ <- erst zur Prüfung anschauen!
└── README.md
```

Die Python Applikation kann mit folgenden Befehlen gebaut und gestartet werden.

- Bauen: `pip install -r requirements.txt`
- Starten: `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`

Die Applikation soll auf dem Port 8000 starten.

### Aufgabe

Erstelle zuerst ein Dockerfile im Ordner `app/` welche die Python Applikation
containerisiert.

- Verwende das offizielle Python-Baseimage
- Kopiere die Dateien ins Image
- Verwende die oben genannten Befehle zum Bauen und Starten
- Expose den Port 8000
- Baue und Starte das Image manuell mit der Docker CLI
  - Bauen: `docker build -t pyapi:1.0 .`
  - Starten: `docker run -d --rm -p 8000:8000 pyapi:1.0`

Erstelle ein Docker-Compose-File, das die API in einem Container startet und den
Port 8000 freigibt. Zudem soll das aktuelle Verzeichnis in den Container
gemountet werden, sodass Änderungen am Code sofort sichtbar sind.

- Starte die Container mit `docker-compose up -d` und rufe die Webseite auf via
  http://localhost:8000
- Stoppe die Container mit `docker-compose down`.
