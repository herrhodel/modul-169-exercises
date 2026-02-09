## Übung 8

:::note

- Zusätzliches Feature: ".dockerignore"

:::

Wir wollen nun ein Image erstellen, wo zu Laufzeit angegeben werden kann,
welches Python-Skript laufen soll. Zudem wollen wir mit einem sogenannten
_.dockerignore_ File definieren, was ignoriert werden soll, wenn wir ein ganzes
Verzeichnis kopieren.

- Kopieren Sie den Ordner von _uebung07_ und nennen Sie in um in _uebung08_.
- Erstellen Sie ein weiteres Python-Skript mit dem Namen `random_number.py` und
  kopieren Sie das unten stehende Skript hinein.
  - Achten Sie wieder auf die Einrückungen.

```python title="random_number.py"
import random

def random_number():
    number_to_guess = random.randint(1, 100)
    print(f"The number is {number_to_guess}")

if __name__ == "__main__":
    random_number()
```

- Kopieren Sie im _Dockerfile_ den gesamten Ordnerinhalt in das
  Arbeitsverzeichnis hinein. Dies erreichen Sie, indem Sie `COPY . .` ergänzen.
  Den anderen COPY Befehl brauchen Sie nicht mehr.
- Damit das _Dockerfile_ selber nicht in das Image kopiert wird, erstellen Sie
  eine Datei mit dem Namen `.dockerignore` und ergänzen sie mit dem Eintrag
  `Dockerfile` wie folgt.

```txt title=".dockerignore"
Dockerfile
```

- Ändern Sie den Rest vom _Dockerfile_ so ab, dass standardmässig `app.py`
  ausgeführt wird. Man soll jedoch beim Starten des Containers auch
  `random_number.py` wählen können.
- Bilden Sie das Image mit dem Tag `-t uebung08`
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung08`. Sie sollten die gleiche Ausgabe wie bei _uebung07_
  erhalten.
- Damit Sie das Spiel spielen können, müssen Sie den Container interaktiv
  starten: `docker run -it --rm uebung08 random_number.py`
  - `-it` startet den Container im interaktiven Modus, das heisst, Sie befinden
    sich nach dem Starten im Container.
  - `--rm` führt dazu, dass der Container gelöscht wird, sobald Sie den
    Container beenden.
  - Mit dem Zusatz `random_number.py` überschreiben Sie den Standartwert des im
    _Dockerfile_ definierten `CMD` Befehl.
