## Übung 2

:::note

- Zusätzlicher Befehl: `ENTRYPOINT`

:::

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `alpine` verwendet,
  das `LABEL Author="Ihr Name"` enthält, den `ENTRYPOINT ["echo"]` und den
  Befehl `CMD ["Standard Ausgabe"]`.
- Bilden Sie das Image mit dem Tag `-t uebung02`
- Überprüfen Sie, ob das Image vorhanden ist, indem Sie `docker image ls`
  ausführen. Das Image _uebung02_ sollte angezeigt werden.
- Vergleichen Sie die Grösse der beiden Images _uebung01_ *und u*ebung02. Was
  fällt Ihnen auf? Woran könnte das liegen?
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung02`.
  - Es sollte Standard Ausgabe ausgegeben werden.
- Erstellen Sie einen Container, sodass neue Ausgabe ausgegeben wird.
