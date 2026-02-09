## Übung 4

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `python:alpine3.20`
  verwendet. Fügen Sie wieder das `LABEL Author="Ihr Name"` hinzu. Ändern Sie
  das Arbeitsverzeichnis (`WORKDIR`) zu "/app". Der Standard-Befehl soll
  `CMD ["pwd"]` sein (Ausgabe des Arbeitsverzeichnisses).
- Bilden Sie das Image mit dem Tag `-t uebung04`
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung04`.
  - Es sollte "/app" ausgegeben werden.
