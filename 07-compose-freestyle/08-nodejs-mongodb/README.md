## NodeJs mit MongoDB

Erstelle zuerst ein Dockerfile, um die NodeJS Applikation zu bauen.

### Level 1

Dann erstelle ein Docker-Compose-File, um die Applikation zu starten. Die
Applikation soll aus drei Containern bestehen:

1. Ein Container für die NodeJS Applikation.
2. Ein Container für die MongoDB (benutze das offizielle Image von
   mongo:7.0.9-jammy).
3. Ein Container für den Mongo-Express-Admin (benutze das offizielle Image von
   mongo-express:latest).
4. Die Applikation soll auf Port 3000 laufen und auf Port 27017 auf die MongoDB
   zugreifen.

Im Node Container sollen die folgenden Umgebungsvariablen gesetzt werden:

- MONGO_DB_USERNAME=root
- MONGO_DB_PASSWORD=pass

Der Service für die MongoDB soll `mongodb` heissen die folgenden
Umgebungsvariablen bekommen:

- MONGO_INITDB_ROOT_USERNAME=root
- MONGO_INITDB_ROOT_PASSWORD=pass

Der Service für den Mongo-Express-Admin soll `mongo-express` heissen und auf
Port 8081 angesprochen werden und die folgenden Umgebungsvariablen bekommen:

- ME_CONFIG_MONGODB_SERVER=mongodb
- ME_CONFIG_MONGODB_ADMINUSERNAME=root
- ME_CONFIG_MONGODB_ADMINPASSWORD=pass

Starte dann die Applikation mit `docker compose up -d`

Dann öffne mongo-express auf http://localhost:8081 und verbinde dich mit der
MongoDB. Erfasse dann eine Datenbank mit dem Namen: `my-db` und daring eine
Collection mit dem Namen: `my-collection`.

Dann erfasse ein Dokument in der Collection mit dem Inhalt:

```json
{
  "myid": 1,
  "mytxt": "Hello from MongoDB"
}
```

Öffne dann die NodeJS Applikation auf http://localhost:3000 und überprüfe, ob
das Dokument angezeigt wird.

### Level 2

Erweitere das Docker-Compose-File so, dass die MongoDB Daten in einem Volume
gespeichert werden.

### Level 3

Im Moment sind die Credentials für die MongoDB im Docker-Compose-File
hardcodiert. Erstelle ein `.env` File und setze die Credentials dort hinein.
Verwende dann die Credentials aus dem `.env` File im Docker-Compose-File.
Erstelle zum Schlus ein `env-schema` File, um die Struktur des benötigten `.env`
Files zu dokumentieren.
