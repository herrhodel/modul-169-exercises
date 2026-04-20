## Lokalen Ordner in einen Docker-Container mounten

### Ziel

Sie sollen einen lokalen Ordner in einen Docker-Container mounten und
demonstrieren, dass Dateien, die im lokalen Ordner erstellt oder geändert
werden, auch im Container sichtbar sind und umgekehrt.

### Schritte

#### 1. Erstellen Sie einen lokalen Ordner:

- Erstellen Sie einen neuen Ordner mit dem Namen `shared` auf Ihrem Host-System,
  der für das Mounten verwendet wird.

#### 2. Starten Sie einen Container mit dem gemounteten Ordner:

- Starten Sie einen Container (z.B. mit einem einfachen Ubuntu-Image) und
  mounten Sie den lokalen Ordner in den Container. Verwenden Sie den folgenden
  Befehl:

```bash
docker run -it --rm -v ./shared:/shared ubuntu bash
```

:::info

- Auf Windows müssen Sie `./shared` mit `.\shared` ersetzen.

:::

#### 3. Erstellen Sie eine Datei im Container:

- Sobald Sie im Container sind (Sie sollten sich in einer Shell des
  Ubuntu-Containers befinden), erstellen Sie eine Datei im gemounteten Ordner:

```bash
echo "Dies ist eine Datei aus dem Container." > /shared/container_file.txt
```

#### 4. Überprüfen Sie die Datei im lokalen Ordner:

- Öffnen Sie ein neues Terminalfenster (lassen Sie den Container laufen) und
  überprüfen Sie, ob die Datei im lokalen Ordner sichtbar ist:

```bash
cat ./shared/container_file.txt`
```

- Sie können dies auch über den Explorer überprüfen.

#### 5. Erstellen Sie eine Datei im lokalen Ordner:

- Erstellen Sie eine Datei im lokalen Ordner (shared) von **Ihrem Host-System**
  mit dem Namen **host_file.txt**.

#### 6. Überprüfen Sie die Datei im Container:

- Gehen Sie zurück zum **Terminal des Containers** und überprüfen Sie, ob die
  Datei im gemounteten Ordner sichtbar ist:

```bash
ls /shared
```

#### 7. Container stoppen und Dateien überprüfen:

- Beenden Sie den Container mit `exit`, dadurch wird er wegen `--rm` auch gleich
  entfernt.
- Überprüfen Sie, ob beide Dateien noch im Ordner shared vorhanden sind.

