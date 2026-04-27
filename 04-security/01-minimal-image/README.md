## Minimales Basisimage

### Ziel

In dieser Übung geht des darum ein `Dockerfile`, welches ein `ubuntu:24.04` als
Basis verwendet und darin Pakete installiert, so umzubauen, dass:

1. Ein spezifisches Image verwendet wird.
2. Keine zusätzlichen Pakete mehr installiert werden müssen.

### Schritte

1. Erstellt ein `Dockerfile` mit folgendem Inhalt:
   - Achtet darauf, das `LABEL` neu zu setzen.

```Dockerfile
FROM ubuntu:24.04
LABEL Author="Ihr Name!"

RUN apt-get update && apt-get -y upgrade && \
    apt-get install -y nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

2. Baut das Image mit dem Tag `minimal-image`
3. Startet es **auf Port 8080** und öffnet http://localhost:8080.
   - Achtung: Port-Mapping.
4. Findet heraus, **welches Paket** genau installiert wird.
5. Sucht dafür ein Baseimage auf https://hub.docker.com/.
6. Passt das `Dockerfile` mit dem neuen Baseimage so an, dass der `RUN` und
   `CMD` Befehl, nicht mehr nötig ist, beim Starten jedoch noch das Gleiche
   passiert.
7. Baut und startet das neue Image.
8. Startet es **auf Port 8080** und öffnet http://localhost:8080.

   - Achtung: Port-Mapping.

9. Bräuchte man dafür wirklich noch ein eigenes Dockerfile?

<details>
  <summary>Lösung</summary>

- Nein, man könnte direkt das `nginx` Basisimage starten
  `docker run -p 8080:80 nginx`
- 💡 Eigene Images machen nur dann Sinn, wenn wirklich eigener Code oder
  Konfiguration nötig ist.

</details>
