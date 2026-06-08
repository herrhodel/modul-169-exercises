## Python Todos mit MySQL-Datenbank und Admin Segmentiert

Eine TodoApp API in Python mit UI in React soll mit docker-compose so gebaut und
gestartet werden, dass die Datenbank durch Netzwerksegmentierung von aussen
abgeschirmt ist.

### Struktur

```bash
.
├── nginx/
├──── nginx.conf
├── solution/ <- erst zur Prüfung anschauen!
├── todo-api/
├──── Dockerfile
├── todo-ui/
├──── Dockerfile
└── README.md
```

### Aufgabe:

Erstelle eine Docker Compose Datei, welche die folgenden Netzwerke, Volumen und
fünf Services `todo-api`, `todo-ui`, `nginx`, `phpmyadmin` sowie `db` definiert.

Die Applikation soll mit `docker compose up -d` gestartet und mit
`docker compose down` wieder gestoppt werden.

#### Netzwerke

Es existieren folgende Netzwerke, diese müssen im `docker-compose.yml` definiert
werden:

- extern
- intern

#### Volumen

Für die Datenbank sollte folgendes Volumen im docker-compose.yml definiert
werden:

- dbdaten

#### nginx

Als Proxy zur `todo-api`, `todo-ui` und zum `phpmyadmin`. Nginx erlaubt es mit
folgenden Pfade via gleicher domain:port auf die einzelnen Services zu gelangen:

- / -> `todo-ui`
- /todos -> `todo-api`
- /admin -> `phpmyadmin`
  - es benötigt ein rewrite

Die Konfiguration befindet sich in der Datei `./nginx/nginx.conf` und sollte
ohne anpassung funktionieren.

Konfiguration:

- **Service name (hostname)**: `nginx`
- **Image**: nginx:1.30.2
- **Bind Mount**: Konfigurationsdatei `./nginx/nginx.conf` muss auf dem Pfad
  `/etc/nginx/nginx.conf` gemountet werden.
- **Interner Port**: 8080
- **Externer Port**: 8080
  - Als einziger exposed!
- **Netzwerk**: extern
- **Abhängigkeiten**: todo-api, todo-ui, phpmyadmin

#### todo-ui

Eine Single-Page Javascript-Applikation welche im Browser die `todo-api`
konsumiert und ein User-Interface dazu bereitstellt. Sie verwendet die Library
React.

Konfiguration:

- **Service name (hostname)**: `todo-ui`
- **Image**: Dockerfile im Unterordner ./todo-ui/
- **Interner Port**: 3000
- **Netzwerke**: extern
- **Abhängigkeit**: `todo-api`

Die App erwartet die API under demselben Domain im Pfad `/todos`.

#### todo-api

Die Todo Api definiert eine HTTP-REST-Schnittstelle um in der Datenbank Todos
anzulegen und zu modifizieren. Sie ist in Python geschrieben und verwendet das
Framework [Fast-API](https://fastapi.tiangolo.com/).

Konfiguration:

- **Service name (hostname)**: `todo-api`
- **Image**: Dockerfile im Unterordner ./todo-api/
- **Interner Port**: 8000
- **Netzwerke**: extern, intern
- **Abhängigkeit**: `db`, wenn service_healthy
  ```yaml
  depends_on:
    db:
      condition: service_healthy
      restart: true
  ```
- **Environment**

  - `DATABASE_URL=mysql+pymysql://root:password@db:3306/tododb`
  - Optional: Environment Variable in einer Datei `.env.secret` definieren und
    mit `env_file` laden.

#### db

Die Mysql-Datenbank wird von der `todo-api` verwendet um die todos zu speichern.
Die `todo-api` erstellt automatisch auf die Tabelle und das Schema.

Konfiguration:

- **Service name (hostname)**: `db`
- **Image**: mysql:8.4.0
- **Interner Port**: 3306
- **Netzwerke**: intern
- **Healthcheck**: Dieser ist wichtig, da die Datenbank zwingend vor der
  `todo-api` gestartet werden muss. Es handelt sich um einen `ping` der sicher
  stellt dass die Datenbank verfügbar ist.
  ```yaml
  healthcheck:
    test:
      [
        "CMD",
        "mysqladmin",
        "ping",
        "-h",
        "localhost",
        "-p${MYSQL_ROOT_PASSWORD}",
      ]
    interval: 1s
    timeout: 5s
    retries: 20
  ```
- **Volumen**: `dbdaten` nach `/var/lib/mysql`
- **Environment**:
  - `MYSQL_ROOT_PASSWORD=password`
  - `MYSQL_DATABASE=tododb`
  - Optional: Environment Variable in einer Datei `.env.secret` definieren und
    mit `env_file` laden.

#### phpmyadmin

Administrationsapp für die Datenbank. Generell eine super App mit einem Gui zur
Verwaltung einer Mysql-Datenbank.

:::caution

**Achtung**: Produktiv sollte diese **NIE!** Im Internet verfügbar gemacht
werden. Diese sollte man nur über das Intranet erreichen können.

:::

Konfiguration:

- **Service name (hostname)**: `phpmyadmin`
- **Image**: phpmyadmin:5-apache
- **Interner Port**: 80
- **Netzwerke**: intern, extern
- **Environment**:
  - `PMA_ARBITRARY=1`
- **Abhängigkeit**: db
  - Die db muss noch nicht gestartet sein. Es muss also nicht gewartet werden.

Starte dann die Applikation mit docker-compose up und überprüfe sie.
