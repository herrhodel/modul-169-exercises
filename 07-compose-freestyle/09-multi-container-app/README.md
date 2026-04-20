## Multi Container App

In der Praxis wird eine Anwendung oft aus mehreren Containern bestehen. In
dieser Aufgabe soll eine einfache Multi-Container-App erstellt werden.

Die Anwendung besteht aus vier Containern:

1. Einem Container mit einer PostgreSQL-Datenbank.
2. Einem Container mit einer Node.js-API, die auf die Datenbank zugreift.
3. Einem Container mit einer GO-API, die auf die Datenbank zugreift.
4. Einem Container mit einem Frontend, das auf die beiden APIs zugreift und in
   React geschrieben ist.

Als ersten Schritt soll ein Container mit einer PostgreSQL-Datenbank erstellt
werden. Der Container soll `db` heissen und das Passwort für den Benutzer
`postgres` soll `foobarbaz` sein. Der Container soll auf Port `5432` auf dem
Host-System verfügbar sein.

Setze die Umgebungsvariable `POSTGRES_PASSWORD` auf `foobarbaz`.

Wie lautet der Befehl, um diesen Container zu erstellen?

`docker run -d -e POSTGRES_PASSWORD=foobarbaz -p 5432:5432 --network newnet --name db postgres:15.1-alpine`

Wechsle in das Verzeichnis `api-node` dort findest du auch mehrere Dockerfiles,
die die Evolution des Dockerfiles zeigen.

Als Nächstes soll ein Container mit einer Node.js-API erstellt werden. Der
Container soll `api-node` heissen und die API soll auf die Datenbank im
`db`-Container zugreifen. Der Container soll auf Port `3000` auf dem Host-System
verfügbar sein.
