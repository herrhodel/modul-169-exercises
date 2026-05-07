## Secrets

Secrets, wie Passwörter, sollen nie in Freitext in Git eingecheckt werden! Noch
besser wäre es mit Tools wie [`fonx`](https://fnox.jdx.dev/) diese auch nie in
Freitext auf dem System zu haben.

In dieser Übung werden wir nun lernen Secrets direkt von einer Lokalen Datei dem
Container beim Start mitzugeben. Danach verwenden wir
[`fnox`](https://fnox.jdx.dev/) um Secrets auch auf dem lokalen System
verschlüsselt speichern zu können.

### Schritte

1. Erstellt eine Datei `.env.secrets` mit folgender Struktur
   ```bash title=".env.secret"
   MY_PASSWORD=super-geheim-123
   ```
2. Startet einen "busybox" Container
   ```bash
   docker run --rm -it busybox:1.37.0
   ```
3. Gebt den Befehl `env` in die Conainer-Shell ein und seht, dass `MY_PASSWORD`
   **nicht** enthalten ist.
4. Startet einen "busybox" Container und ladet die Datei als `--env-file` in den
   Container.
   ```bash
   docker run --rm -it --env-file .env.secret busybox:1.37.0
   ```
5. Gebt den Befehl `env` in die Conainer-Shell ein und seht, dass `MY_PASSWORD`
   ausgegeben wird.
6. Die Datei `.env.secret` dürft ihr **nicht in Git einchecken**! Dies kann man
   erreichen, indem der Dateiname in die Datei `.gitignore` eingetragen wird.
   ```bash title=".gitignore"
   .env.secret
   ```

### Mit fnox in der Ubuntu VM

:::note

- Wollt ihr **fnox** unter Windows nutzen, müsst Ihr Euch selber um die
  [Installation](https://fnox.jdx.dev/guide/installation.html) kümmern.

:::

1. Fnox installieren mit `mise use fnox -g`
2. Age Keygen installieren mit `mise use age -g`
3. Key generieren:
   `mkdir -p ~/.config/fnox && age-keygen -o ~/.config/fnox/age.txt`
   - Den "Public Key"" in der Bash History lassen, damit er später kopiert
     werden kann.
4. Fnox im Übungsordner initialisieren
   ```bash
   cd 04-security/04-secrets
   fnox init
   ```
   - Would you like to set up a provider now?: **Yes**
   - What type of provider do you want to use? **Local (easy to start)**
   - Select provider: **Age encryption**
   - Age public key (recipient): **Public Key von vorhin!**
   - Provider name: **age**
   - Would you like to add an example secret? **no**
5. Verschlüsseltes Secret erstellen
   ```bash
   fnox set MY_PASSWORD "super-geheim-123-verschlüsselt!"
   ```
6. Öffnet die Datei `fnox.toml` mit `code fnox.toml`. Sieht den verschlüsselten
   Eintrag.
   - Diese Datei dürft Ihr in Git einchecken, **ausser ihr habe Plaintext
     ausgewählt**!
7. Container Starten und Fnox Environment Variable übergeben
   ```bash
   fnox exec -- docker run --rm -it -e MY_PASSWORD busybox:1.37.0
   ```
8. Gebt den Befehl `env` in die Conainer-Shell ein und seht, dass `MY_PASSWORD`
   unverschlüsselt ausgegeben wird.
