# Docker Compose Volume

In dieser Aufgabe lernen wir wie in docker compose ein Volumen erstellt und in
den Container "gemountet" werden kann. Dadurch können Dateien ein Löschen des
Containers überlegen.

Die Docker Befehle ohne Compose lauten:

```bash
docker volume create ubuntu-volume
```

```bash
docker run --name compose-uebung02 -v ubuntu-volume:/volume ubuntu
```

## Auftrag

1. Erstellen Sie eine Datei `docker-compose.yml`
2. Erstellen Sie darin einen Service `ubuntu` mit dem offiziellen Docker Image
   `ubuntu` und dem `container_name` "compose-uebung02".
3. Damit das Image nach dem Starten nicht direkt wieder gestoppt wird, müssen
   wir unter dem Service den Wert `tty: true` setzen.
4. Erstellen Sie ein Volumen mit dem Namen `ubuntu-volume`.
   - Achtung, nicht unter `services`, sondern auf toplevel!
5. Mounten Sie das Volumen im Service `ubtuntu` auf dem Pfad `/volume`.
   - Hier nun unter `services.ubuntu.volumes` und nicht im Toplevel.
6. Starten Sie den Container mit dem Befehl

   ```bash
   docker compose up -d
   ```

7. Öffnen Sie eine bash im container mit dem Befehl:

   ```bash
   docker exec -it compose-uebung02 /bin/bash
   ```

8. Erstellen Sie eine neue Datei im gemounteten Volumen:

   ```bash
   echo "hallo welt" > /volumen/hallo-welt.txt
   ```

9. Prüfen Sie, ob die Datei hier ist:

   ```bash
   cat volume/hallo-welt.txt
   ```

10. Gehen Sie aus dem Container mit `exit`, oder öffnen Sie ein neues
    Terminalfenster.

11. Stoppen und Löschen Sie den Container mit dem Befehl:

    ```bash
    docker compose down --remove-orphans
    ```

12. Starten Sie den Container erneut mit und schauen Sie, ob die Datei noch da
    ist und schliessen Sie das Terminal wieder.

    ```bash
    docker compose up -d
    docker exec -it compose-uebung02 /bin/bash
    cat volume/hallo-welt.txt
    exit
    ```

13. Schauen Sie nun ob docker compose das Volumen erstellt hat mit dem Befehl:

    ```bash
    docker volumes ls
    ```

14. Es sollte ein Volumen sichtbar sein das auf `_ubuntu-volume` endet. Der
    Prefix ist der Ordnername, indem sich das `docker-compose.yml` befindet.
15. Löschen sie nun das Volumen mit dem Befehl:

    ```bash
    docker volume rm <ordnername-unterschiedlich>_ubuntu-volume
    ```

16. Es sollte der Error "...: volume is in use" erscheinen.
17. Stoppen Sie den Container mit dem Befehl:
    ```bash
    docker compose down
    ```
18. Löschen Sie jetzt das Volumen nochmals mit demselben Befehl. Diesmal sollte
    es gehen.

    ```bash
    docker volume rm <ordnername-unterschiedlich>_ubuntu-volume
    ```

19. Das Volumen sollte nun wieder weg sein.

    ```bash
    docker volume ls
    ```

20. Erstellen Sie ein Diagramm mit dem Befehl:

    ```bash
    docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
    ```

21. Öffnen Sie die erstellte Datei `docker-compose.png`
