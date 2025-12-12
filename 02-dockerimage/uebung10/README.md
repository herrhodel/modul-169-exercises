## Übung 10

Wir kreieren ein Image, bei welchem nginx installiert und verwendet wird. Nginx
kann man unter anderem als Webserver verwenden. Damit der Webserver erreichbar
ist, muss man den entsprechenden Port im Dockerfile "exponieren". Dies geschieht
mit dem EXPOSE Befehl.

- Kreieren Sie folgendes _Dockerfile_:

```Dockerfile title="Dockerfile"
FROM ubuntu:24.04
LABEL Author="Ihr Name"
RUN apt-get update && apt-get -y upgrade && \
apt-get install -y nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- Erstellen Sie das Image mit dem Tag `-t uebung10`
- Erstellen Sie einen Container mit dem Befehl `docker run --rm uebung10`.
  Versuchen Sie, die Standard-Webseite in Ihrem Browser zu öffnen, indem Sie auf
  die URL http://localhost:80 gehen.
  - (Es wird nicht funktionieren.) Sie können den laufenden Container mit Ctrl +
    C beenden.
- Docker öffnet den Port nur für Kommunikation zwischen Containern im internen
  Docker-Netzwerk. Es öffnet den Port nicht für Zugriff vom Host-Computer. Um
  den Zugriff vom Host-Computer zu ermöglichen, müssen Sie den Port mit
  `-p 80:80` freischalten.

  ```shell
  docker run --rm -p 80:80 uebung10
  ```

:::tip

- Klappt dies nicht, Windows hat den Port 80 ab und zu belegt, könnt Ihr auch
  ein anderen Host-Port verwenden. Links ist immer der Host und rechts vom `:`
  der Port im Container.

  ```shell
  docker run --rm -p 8080:80 uebung10
  ```

  :::
