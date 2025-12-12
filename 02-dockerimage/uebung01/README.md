## Übung 1

:::note

- Befehle: `LABEL`, `CMD`
- sowie: `-t`

:::

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `ubuntu` verwendet
  (`FROM`), das `Label Author="Ihr Name"` enthält (`LABEL`), und den Befehl
  `["echo", "Mein erstes Docker Image"]`ausführt`(CMD)`.
- Bilden Sie das Image mit dem Befehl `docker buildx build -t uebung01 .`
  (inklusive Punkt am Schluss)
- Überprüfen Sie, ob das Image vorhanden ist, indem Sie `docker image ls`
  ausführen. Das Image _uebung01_ sollte angezeigt werden.
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehl
  `docker run uebung01`.
  - Es sollte Mein erstes Docker Image ausgegeben werden.
