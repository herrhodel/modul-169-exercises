# Docker Compose Bind Mount

In diesem Beispiel wird nun nicht nur ein Image konfiguriert, sondern auch ein
Bind Mount definiert, damit ein lokal verfügbare Datei automatisch mit dem
Container synchronisiert wird.

Der Docker Befehl ohne Compose lautet:

```bash
docker compose run -p 8080:80 -v ./html:/usr/share/nginx/html nginx
```

## Auftrag

1. Kopieren Sie das `docker-compose.yml` der vorherigen Übung
   `Docker Comose Image`.
   - Wenn noch nicht gemacht, machen Sie zuerst diese Aufgabe.
2. Erstellen Sie einen Ordner `html`
3. Erstellen Sie im Ordner `html` eine Datei `index.html` und kopieren Sie
   folgenden Code rein.

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Meine Nginx-Seite</title>
     </head>

     <body>
       <h1>Willkommen auf meiner Webseite!</h1>
     </body>
   </html>
   ```

4. Fügen Sie dem Service `nginx` in der Datei `docker-compose.yml` ein folgendes
   Volumen an:

   - Host Pfad: `./html`
   - Container Pfad: `/usr/share/nginx/html`

5. Starten Sie den Service mit dem Befehl.

   ```bash
   docker compose up -d
   ```

6. Öffnen Sie den Browser auf der Adresse `http://localhost:8080`
7. Ändern Sie die Datei `./html/index.html` beliebig
8. Aktualisieren Sie den Browser http://localhost:8080 `F5` oder auf Mack
   `Command + r`.
9. Stoppen Sie den Service mit dem Befehl:

   ```bash
   docker compose down
   ```

10. Erstellen Sie ein Diagramm mit dem Befehl:

    ```bash
    docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
    ```

11. Öffnen Sie die erstellte Datei `docker-compose.png`
