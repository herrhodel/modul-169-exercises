## Übung 3

:::note

- Zusätzlicher Befehl: `WORKDIR`

:::

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `python:alpine3.20`
  verwendet. Fügen Sie wieder das `LABEL Author="Ihr Name"` hinzu. Der
  Standard-Befehl soll `CMD ["pwd"]` sein (Ausgabe des Arbeitsverzeichnisses).
- Bilden Sie das Image mit dem Tag `-t uebung03`.
- Überprüfen Sie, ob das Image vorhanden ist. Vergleichen Sie die Grösse mit dem
  Image _uebung02_. Beide verwenden `alpine` als Basis-Image, trotzdem ist die
  Grösse unterschiedlich. Warum?
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung03`.
  - Es sollte / ausgegeben werden.
