## Übung 5

:::note

- Zusätzlicher Befehl: `RUN`.

:::

Nun wollen wir selber Python installieren und verwenden als Basis-Image wieder
alpine.

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image _alpine_ verwendet.
- Installieren Sie _python 3.12_, indem Sie folgende Befehle ergänzen:

```Dockerfile
# Use the latest Alpine image
FROM alpine:latest

# Update the package index and install Python 3.12 and pip
RUN apk add --no-cache python3=3.12.8-r1
RUN apk add --no-cache py3-pip

# Set the working directory
WORKDIR /app
```

- Fügen Sie wieder das `LABEL Author="Ihr Name"` hinzu. Ändern Sie das
  Arbeitsverzeichnis (WORKDIR) zu `"/app"`. Der Standard-Befehl soll
  `CMD ["python3"]` sein.
- Bilden Sie das Image mit dem Tag `-t uebung05`
- Überprüfen Sie, ob das Image vorhanden ist. Vergleichen Sie die Grösse mit dem
  Image _uebung04_. Beide verwenden Alpine als Basis-Image und haben Python
  installiert, trotzdem ist die Grösse unterschiedlich. **_Warum?_**
