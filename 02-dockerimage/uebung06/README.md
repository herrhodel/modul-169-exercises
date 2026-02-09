## Übung 6

:::note

- Zusätzliches Feature: Optimierung

:::

Wir optimieren das _Dockerfile_ der Übung 5, indem wir die Installation von
Python und Pip in **einen `RUN` Befehl** vereinen.

- Kopieren Sie das Dockerfile der Übung 5
- Ersetzen Sie die beiden Zeilen (rot) mit folgendem Befehl (grün). Dies führt
  dazu, dass die Installation von Python und Pip nur eine Schicht in Anspruch
  nehmen.

```Dockerfile
...
# Update the package index and install Python 3.12 and pip
//highlight-red-start
RUN apk add --no-cache python3
RUN apk add --no-cache py3-pip
//highlight-red-end
//highlight-green-start
RUN apk add --no-cache python3 py3-pip
//highlight-green-end
...
```

- Bilden Sie das Image mit dem Tag `-t uebung06`
- Überprüfen Sie, ob das Image vorhanden ist. Vergleichen Sie die Grösse mit dem
  Image _uebung05_. Sie sollten einen kleinen Grössenunterschied feststellen
  können. In diesem Fall ist es nicht viel, kann aber je nach Installation viel
  ausmachen.
- Sie können die erstellten Layer sehen, indem Sie folgenden Befehl ausführen:
  `docker image inspect uebung05`. Unter dem zweitletzten Eintrag RootFS des
  angezeigten JSON sieht man die Layer. Bei _uebung05_ sollten es 4 sein, bei
  _uebung06_ nur noch 3. Zu sehen sind die Hash-Werte der Layer (sha256).
