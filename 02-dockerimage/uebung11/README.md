## Übung 11

In dieser Übung ist das Ziel, ein Multistage Build zu kreieren. Es soll zeigen,
wie das grundsätzlich funktioniert und was der Vorteil davon ist.

- Im Stage 1 werden Dateien mithilfe eines Pythonskripts erzeugt, welche im
  Stage 2 verwendet werden. Das Pythonskript wird im finalen Docker Image nicht
  mehr verwendet, sondern dient nur der Erstellung der Dateien.
- Kreieren Sie eine Datei mit dem Namen `generate_files.py` und kopieren Sie den
  untenstehenden Inhalt hinein. Achten Sie auf die Einrückungen.

```python title="generate_files.py"
with open("file1.txt", "w") as f:
    f.write("This is file 1\n")
with open("file2.txt", "w") as f:
    f.write("This is file 2\n")
with open("file3.txt", "w") as f:
    f.write("This is file 3\n")
```

Nun erstellen wir das _Dockerfile_ mit mehreren Stages.

```Dockerfile title="Dockerfile"
# Stage 1: Build stage
FROM python:3.9-slim AS builder
WORKDIR /app
COPY generate_files.py .
RUN python generate_files.py

# Stage 2: Runtime stage
FROM python:3.9-slim
WORKDIR /app
COPY --from=builder /app/\*.txt .
CMD ["cat", "file1.txt", "file2.txt", "file3.txt"]
```

- Erklären Sie, was die einzelnen Schritte machen.
- Bilden Sie das Image mit dem Tag `-t uebung11`
- Erstellen Sie einen Container mit dem Befehl `docker run --rm uebung11`
- Führen Sie den Container "interaktiv" aus und überprüfen Sie mit dem Befehl
  `ls` im Ordner `/app`, ob wirklich nur die Textdateien vorhanden sind.
  - `docker run -it uebung11 /bin/bash`
  - `ls` im Container listet die Files
