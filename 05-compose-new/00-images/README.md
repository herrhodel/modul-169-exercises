# Docker Compose Images

In diesem Beispiel wird ein einfacher Nginx gestartet und den Port 80 vom
container auf den Port 8080 vom Host geleitet.

Der Docker Befehl ohne Compose lautet:

```bash
docker run -p 8080:80 nginx
```

## Auftrag

1. Erstellen Sie ein `docker-compose.yml`.
2. Definieren Sie darin einen Service mit dem Namen `nginx`.
3. Das `image` wird von Dockerhub gezogen und heisst `nginx`.
4. Leiten Sie den Port `8080` vom Host zum Port `80` im Container.
5. Starten Sie den container mit dem Befehl

   ```bash
   docker compose up
   ```

6. Öffnen Sie den Browser auf der Adresse `http://localhost:8080`
7. Stoppen Sie den Container mit `ctrl-c`.
8. Starten Sie den Container nun mit dem Befehl

   ```bash
   docker compose up -d
   ```

9. Nun läuft der Service im Hintergrund. Überprüfen Sie dies mit dem Befehl

   ```bash
   docker ps
   ```

10. Stoppen Sie den Service mit dem Befehl:

    ```bash
    docker compose down
    ```

11. Erstellen Sie ein Diagramm mit dem Befehl:

    ```bash
    docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
    ```

12. Öffnen Sie die erstellte Datei `docker-compose.png`
