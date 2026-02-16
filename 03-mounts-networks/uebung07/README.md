## MariaDB und phpMyAdmin im Docker-Netzwerk

### Ziel

Sie sollen lernen, wie man einen MariaDB-Container und einen
phpMyAdmin-Container erstellt und konfiguriert, um über eine Weboberfläche auf
die Datenbank zuzugreifen.

### Schritte

#### 1. Erstellen Sie ein Netzwerk:

- Zuerst erstellen Sie ein Docker-Netzwerk mit dem Namen `db-net`, in dem die
  Container kommunizieren können:

```bash
docker network create db-net
```

#### 2. Starten Sie den MariaDB-Container

- Führen Sie den folgenden Befehl aus, um den MariaDB-Container zu starten:

```bash
docker run -d
  --name mariadb \
  --network db-net \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=mydatabase \
  mariadb:latest
```

- **MYSQL_ROOT_PASSWORD**: Setzt das Passwort für den Root-Benutzer.
- **MYSQL_DATABASE**: Erstellt eine Datenbank mit dem Namen mydatabase.

#### 3. Starten Sie den phpMyAdmin-Container

- Führen Sie den folgenden Befehl aus, um den phpMyAdmin-Container zu starten:

```bash
docker run -d \
  --name phpmyadmin \
  --network db-net \
  -e PMA_HOST=mariadb \
  -e PMA_USER=root \
  -e PMA_PASSWORD=rootpassword \
  -p 8080:80 \
  phpmyadmin/phpmyadmin
```

- **PMA_HOST**: Gibt den Hostnamen des MariaDB-Containers an.
- **PMA_USER**: Setzt den Benutzer für den Zugriff auf die Datenbank.
- **PMA_PASSWORD**: Setzt das Passwort für den Benutzer.

#### 4. Zugriff auf phpMyAdmin

- Öffnen Sie einen Webbrowser und gehen Sie zu
  [http://localhost:8080](http://localhost:8080). Sie sollten die
  phpMyAdmin-Anmeldeseite sehen.

#### 5. Anmelden bei phpMyAdmin

- Melden Sie sich, falls nötig, mit den folgenden Anmeldedaten an:
  - **Benutzername**: root
  - **Passwort**: rootpassword

#### 6. Datenbank bearbeiten

- Nach der Anmeldung sollten Sie die Datenbank `mydatabase` sehen.
- Sie können Tabellen erstellen, Daten hinzufügen, bearbeiten und löschen.

#### 7. Beobachtungen und Diskussion

- Diskutieren Sie, wie die Container miteinander kommunizieren und welche Rolle
  das Docker-Netzwerk dabei spielt.
- Erklären Sie die Bedeutung von Umgebungsvariablen beim Starten der Container.

#### 8. Container stoppen und entfernen

- Nachdem die Übung abgeschlossen ist, können Sie die Container stoppen und
  entfernen:

```bash
docker stop mariadb phpmyadmin
docker rm mariadb phpmyadmin
docker network rm db-net
```
