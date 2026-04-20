## Lokalen Ordner zwischen zwei Docker-Containern teilen

### Ziel

Sie erstellen einen lokalen Ordner und teilen diesen Ordner zwischen zwei
Docker-Containern. Demonstrieren Sie, dass Dateien, die in einem Container
erstellt oder geändert werden, auch im anderen Container sichtbar sind.

### Schritte

#### 1. Erstellen Sie einen lokalen Ordner:

- Erstellen Sie einen neuen Ordner mit dem Namen `shared` auf Ihrem Host-System,
  der für das Mounten verwendet wird.

#### 2. Starten Sie den ersten Container mit dem gemounteten Ordner:

- Starten Sie den ersten Container (z. B. mit einem Ubuntu-Image) und mounten
  Sie den lokalen Ordner in den Container. Verwenden Sie den folgenden Befehl:

```bash
docker run -it --rm -v ./shared:/shared ubuntu bash
```

#### 3. Erstellen Sie eine Datei im ersten Container:

- Sobald Sie im ersten Container sind, erstellen Sie eine Datei im gemounteten
  Ordner:

```bash
echo "Dies ist eine Datei aus Container 1." > /shared/file_from_container1.txt
```

#### 4. Starten Sie den zweiten Container mit dem gleichen gemounteten Ordner:

- Öffnen Sie ein neues Terminalfenster (lassen Sie den ersten Container laufen)
  und starten Sie den zweiten Container, der ebenfalls den lokalen Ordner
  mountet:

```bash
docker run -it --rm -v ./shared:/shared ubuntu bash
```

#### 5. Überprüfen Sie die Datei im zweiten Container:

- Sobald Sie im zweiten Container sind, überprüfen Sie, ob die Datei, die im
  ersten Container erstellt wurde, sichtbar ist:

```bash
cat /shared/file_from_container1.txt
```

#### 6. Erstellen Sie eine Datei im zweiten Container:

- Erstellen Sie eine Datei im zweiten Container im gemounteten Ordner:
  `echo "Dies ist eine Datei aus Container 2." > /shared/file_from_container2.txt`

#### 7. Überprüfen Sie die Datei im ersten Container:

- Gehen Sie zurück zum Terminal des ersten Containers und überprüfen Sie, ob die
  Datei, die im zweiten Container erstellt wurde, sichtbar ist:

```bash
cat /shared/file_from_container2.txt
```

#### 8. Vergewissern Sie sich, dass wirklich zwei container laufen

- Öffnen Sie ein neues Terminalfenster und prüfen die Prozesse. Es sollten zwei
  Prozesse sichtbar sein.

```bash
docker ps
```

#### 9. Zeigen sie, dass nur Dateien im Ordner /shared geteilt werden

- Erstellen Sei im Terminal vom Container 1 eine Datei im Ordner `/tmp`.

```bash
echo "Dies ist eine Datei nur im Container 1." > /tmp/file_from_container1.txt
```

- Überprüfen Sie, ob die Datei existiert.

```bash title="Container 1"
ls /tmp
```

- Der gleiche Befehl im Container 2 sollte die Datei nicht darstellen

```bash title="Container 2"
ls /tmp
```
