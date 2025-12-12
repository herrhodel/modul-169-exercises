## Übung 7

:::note

- Zusätzlicher Befehl: `COPY`.

:::

Jetzt wollen wir ein einfaches Python-Programm laufen lassen. Wir benützen als
Basis-Image python:3.13.1-alpine3.20. Dies bedeutet, dass wir die Python-Version
3.13.1 und die alpine-Version 3.20 verwenden. Es ist gute Praxis, konkrete
Versionen des Base-Images zu wählen, um Versions-Konflikte mit dem Programm,
welches im Container läuft, zu verhindern.

- Erstellen Sie ein Dockerfile mit der Basis `python:3.13.1-alpine3.20`
- Definieren Sie als Arbeitsverzeichnis `/app`.
- Erstellen Sie im Ordner dieser Übung die Datei `app.py` und kopieren Sie
  folgenden Inhalt hinein.
  - Achten Sie darauf, dass die Einrückungen gleich sind!

```python title="app.py"
import os

def list_folders_in_root():
    # Get the list of all entries in the root directory
    entries = os.listdir('/')
    # Filter out only directories
    folders = [entry for entry in entries if os.path.isdir(os.path.join('/', entry))]
    return folders

if **name** == "**main**":
    folders = list_folders_in_root()
    print("Folders in the root directory:")
    for folder in folders:
        print(folder)
```

- Kopieren Sie `app.py` mit dem `COPY` Befehl in das Arbeitsverzeichnis.
- Sorgen Sie mit dem `CMD` Befehl dafür, dass die App ausgeführt wird.
- Bilden Sie das Image mit dem Tag `-t uebung07`
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung07`.
- Sie sollten eine Ausgabe aller Ordner im Root-Verzeichnis bekommen: _home,
  bin, run…_

