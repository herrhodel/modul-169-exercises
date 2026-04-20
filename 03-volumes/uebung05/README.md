## Datenbankeinträge in einem Docker-Volume speichern

### Ziel

Sie sollen eine MariaDB-Datenbank in einem Docker-Volume erstellen, einen
Eintrag hinzufügen, den Container entfernen und einen neuen Container starten,
um zu überprüfen, ob die Daten weiterhin vorhanden sind.

### Schritte

#### 1. Starten Sie den MariaDB-Container mit einem Volume

- Führen Sie den folgenden Befehl aus, um den MariaDB-Container zu starten und
  ein Volume zu erstellen, das die Daten speichert:

```bash
docker run -d --name my_mariadb_container \
  -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=mydatabase \
  -v mariadb_data:/var/lib/mysql \
  -p 3306:3306 mariadb
```

- Hierbei wird ein Docker-Volume namens `mariadb_data` erstellt, das die
  Datenbankdaten speichert. Das Root-Passwort wird auf `root` gesetzt, und eine
  Datenbank namens `mydatabase` wird erstellt.

#### 2. Überprüfen Sie, ob der Container läuft

- Führen Sie den folgenden Befehl aus, um zu überprüfen, ob der
  MariaDB-Container läuft:

```bash
docker ps
```

#### 3. Fügen Sie einen Eintrag in die Datenbank hinzu

- Verwenden Sie den folgenden Befehl, um die MariaDB-Shell zu öffnen:
  - Geben Sie das Passwort _root_ ein, wenn Sie dazu aufgefordert werden.

```bash
docker exec -it my_mariadb_container mariadb -u root -p
```

- Führen Sie die folgenden SQL-Befehle aus, um eine Tabelle zu erstellen und
  einen Eintrag hinzuzufügen:

```sql
USE mydatabase;
CREATE TABLE mytable (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));
INSERT INTO mytable (name) VALUES ('Mein erster Eintrag');
```

#### 4. Überprüfen Sie die Einträge in der Datenbank

- Um die Einträge in der Tabelle zu überprüfen, führen Sie den folgenden Befehl
  aus:

```sql
SELECT * FROM mytable;
```

#### 5. Beenden Sie die MariaDB-Shell

- Geben Sie `exit` in die MariaDB-Shell ein, um die sie zu verlassen.

#### 6. Stoppen und entfernen Sie den MariaDB-Container

- Führen Sie die folgenden Befehle aus, um den MariaDB-Container zu stoppen und
  zu entfernen:

```bash
docker stop my_mariadb_container
docker rm my_mariadb_container
```

#### 7. Starten Sie den MariaDB-Container erneut mit demselben Volume

- Führen Sie den folgenden Befehl aus, um den MariaDB-Container erneut zu
  starten und das Volume zu verwenden:

```bash
docker run -d --name my_mariadb_container \
  -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=mydatabase \
  -v mariadb_data:/var/lib/mysql \
  -p 3306:3306 mariadb
```

#### 8. Überprüfen Sie die Daten erneut

- Verwenden Sie wieder den Befehl, um die MariaDB-Shell zu öffnen:

```bash
docker exec -it my_mariadb_container mariadb -u root -p
```

#### 9. Geben Sie das Passwort root ein, wenn Sie dazu aufgefordert werden

- Führen Sie die folgenden SQL-Befehle aus, um die Datenbank und die Tabelle zu
  verwenden und die Einträge zu überprüfen:

```sql
USE mydatabase;
SELECT * FROM mytable;
```

## Fazit

Der Eintrag "Mein erster Eintrag" sollte weiterhin vorhanden sein, auch nachdem
der Container entfernt und neu gestartet wurde. Dies zeigt, dass die Daten in
einem Docker-Volume gespeichert wurden und somit persistent sind.

## Optional: Aufräumen

Wenn Sie mit der Übung fertig sind und die Ressourcen freigeben möchten, können
Sie den Docker-Volume mit folgendem Befehl entfernen:

```bash
docker container prune
docker volume rm mariadb_data
```
