## Kein Root User verwenden

### Ziel

In dieser Übung geht des darum ein `Dockerfile`, welches den USER `root`
verwendet so umzubauen, dass der Container mit einem USER `appuser` arbeitet,
welcher nur Schreibrecht auf das `WORKDIR` /app hat.

### Schritte

1. Erstellt ein `Dockerfile` mit folgendem Inhalt:

```Dockerfile
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com | bash - \
    && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3000
CMD ["node", "index.js"]
```

2. Baut das Image mit dem Tag `no-root`.
3. Startet es **auf Port 3000** und öffnet http://localhost:3000.
   - Achtung: Port-Mapping.
4. Öffnet eine Shell im Container mit `docker exec -it no-root /bin/bash`.
5. Prüft den User mit dem Befehl `whoami`.
6. Stoppt den Container und öffnet das `Dockerfile`.
7. Erstellt einen Benutzer mit im `Dockerfile` mit folgendem Befehl:
   - Der Befehl muss vor `WORKDIR` stehen.
   - `RUN adduser --system --group --home /home/appuser appuser`.
8. Gebt dem User Rechte auf `/app` mit folgendem Befehl nach `WORKDIR`
   - `RUN chown appuser:appuser /app`.
9. Verwendet den user _appuser_ mit folgendem Befehl, nach dem die Rechte
   gesetzt wurden.
   - `USER appuser`.
10. Der Befehl `COPY` muss mit dem Parameter `--chown=appuser:appuser` ergänzt
    werden, damit der `appuser` Berechtigung auf die kopierten Dateien hat.
11. Baut das Image erneut und startet es.
12. Öffnet eine Shell im Container mit `docker exec -it no-root /bin/bash`.
13. Prüft den User mit dem Befehl `whoami`.
