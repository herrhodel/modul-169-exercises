# Docker Compose Network

In diesem Beispiel Konfigurieren wir eine MySql Datenbank und eine phpMyAdmin
Weboberfläche, wie in der Übung 8 der Netzwerk-Aufgaben. Nun soll es aber
möglich sein, diese Services so zu konfigurieren, dass ein `docker compose up`
genügt, damit alles korrekt startet.

Die Docker Befehle ohne Compose lauten:

```bash
docker network create db-net
```

```bash
docker run -d \
  --name compose-uebung03-mysql \
  --network db-net \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=mydatabase \
  mysql
```

```bash
docker run -d \
  --name compose-uebung03-phpmyadmin \
  --network db-net \
  -e PMA_HOST=mysql \
  -e PMA_USER=root \
  -e PMA_PASSWORD=rootpassword \
  -p 8080:80 \
  phpmyadmin/phpmyadmin
```

```bash
docker container stop compose-uebung03-mysql
docker container stop compose-uebung03-phpmyadmin
docker network rm db-net
docker container prune
```

## Auftrag

Wir wollen jetzt diese Befehle in ein `docker-compose.yml` überführen.

1. Erstellen Sie eine Datei `docker-compose.yml`
2. Fügen Sie ein Service `services.mysql` hinzu.
3. Versuchen Sie den docker Befehl zu mysql zu übertragen.
4. Fügen Sie eine Service `services.phpmyadmin` hinzu.
5. Versuchen Sie den docker Befehl zu phpmyadmin zu übertragen.
6. Fügen Sie auf Toplevel im `docker-compose.yml` ein Netzwerk `db-net` mit dem
   `driver: bridge` hinzu.
7. Starten Sie die Services mit dem Befehl:

   ```bash
   docker compose up -d
   ```

8. Öffnen Sie den Browser unter `http://localhost:8080`.
9. Wenn Sie zu schnell sind, erscheint eine Warnung, dass MySql nicht korrekt
   konfiguriert ist. Diese erscheint, da der MySql Server noch nicht gestartet
   ist.

### Healthcheck und `depends_on`

Damit unterschiedliche Services aufeinander warten, gibt es zum einen die
Möglichkeit eines "Healthcheck" in Kombination mit `depends_on`. Dies ist ein
Befehl, der angibt, ob ein Service läuft. Für Mysql ist dies
`mysqladmin ping -h localhost`.

10. Healthcheck definieren

Fügen Sie dem Service `mysql` folgende Konfiguration bei:

```yaml
healthcheck:
  test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
  timeout: 5s
  retries: 20
```

Damit wird alle 5 Sekunden, 20 Mal versucht zu pingen. Also zu schauen, ob die
DB antwortet. Also zu schauen, ob die DB antwortet.

11. `depends_on` definieren

Damit dies Sinn macht, muss der Service `phpmyadmin` auf den Service `mysql`
warten. Dies erreichen wir mit folgender Konfiguration, die dem Service
`phpmyadmin` hinzugefügt werden muss.

```yaml
depends_on:
  mysql:
    condition: service_healthy
```

12. Neustarten

Stoppen und starten Sie nun die services neu mit den Befehlen:

```bash
docker compose down
docker compose up -d
```

Nun wartet der Service `phpmyadmin` bis der Service `mysql` gestartet ist. Wenn
jetzt im Browser `http://localhost:8080` eingegeben wird, kommt sehr lange
"Verbindung fehlgeschlagen", bis alles gestartet ist. Dafür hat `phpmyadmin` nie
ein Verbindungsfehler.

### Diagram erstellen

13. Erstellen Sie ein Diagramm mit dem Befehl:

```bash
docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
```

14. Öffnen Sie die erstellte Datei `docker-compose.png`
