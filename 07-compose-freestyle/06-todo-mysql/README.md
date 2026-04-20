## FastApi Todos mit MySQL-Datenbank

### Ziel: Die Applikation soll in Container verpackt werden und mit Compose gestartet werden.

Die einzelnen Container (Services) sind:

- api (mit Dockerfile erstellt)
- db (image: mysql:8.4.0, Port 3306, /var/lib/mysql)
- dbtool (image: phpmyadmin:5-apache, Port 80)

### Aufgabe:

Erstelle ein compose-File, das die drei Services api, db und dbtool definiert.

Die folgenden Umgebungsvariablen müssen definiert werden:

Für die api:

DATABASE_URL=mysql+pymysql://root:password@db:3306/tododb

Für die db:

- MYSQL_ROOT_PASSWORD=password
- MYSQL_DATABASE=tododb

Für die dbtool:

- PMA_ARBITRARY=1

Starte dann die Applikation mit docker-compose up und überprüfe sie.
