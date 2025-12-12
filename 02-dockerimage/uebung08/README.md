## Übung 8

:::note

- Zusätzliches Feature: ".dockerignore"

:::

Wir wollen nun ein Image erstellen, wo zu Laufzeit angegeben werden kann,
welches Python-Skript laufen soll. Zudem wollen wir mit einem sogenannten
_.dockerignore_ File definieren, was ignoriert werden soll, wenn wir ein ganzes
Verzeichnis kopieren.

- Kopieren Sie den Ordner von _uebung07_ und nennen Sie in um in _uebung08_.
- Erstellen Sie ein weiteres Python-Skript mit dem Namen `guess_the_number.py`
  und kopieren Sie das unten stehende Skript hinein.
  - Achten Sie wieder auf die Einrückungen.

```python title="guess_the_number.py"
import random

def guess_the_number():
    number_to_guess = random.randint(1, 100)
    attempts = 0
    print("Welcome to 'Guess the Number'!")
    print("I'm thinking of a number between 1 and 100.")
    while True:
        try:
            guess = int(input("Take a guess: "))
            attempts += 1
            if guess < number_to_guess:
                print("Too low! Try again.")
            elif guess > number_to_guess:
                print("Too high! Try again.")
            else:
                print(f"Congratulations! You've guessed the number {number_to_guess} in {attempts} attempts.")
                break
        except ValueError:
            print("Please enter a valid integer.")

if __name__ == "__main__":
    guess_the_number()
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
  `guess_the_number.py` wählen können.
- Bilden Sie das Image mit dem Tag `-t uebung08`
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung08`. Sie sollten die gleiche Ausgabe wie bei _uebung07_
  erhalten.
- Damit Sie das Spiel spielen können, müssen Sie den Container interaktiv
  starten: `docker run -it --rm uebung08 guess_the_number.py`
  - `-it` startet den Container im interaktiven Modus, das heisst, Sie befinden
    sich nach dem Starten im Container.
  - `--rm` führt dazu, dass der Container gelöscht wird, sobald Sie den
    Container beenden.
  - Mit dem Zusatz `guess_the_number.py` überschreiben Sie den Standartwert des
    im _Dockerfile_ definierten `CMD` Befehl.

