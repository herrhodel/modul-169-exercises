## Übung 9

:::note

- Zusätzlicher Befehl: `ENV`.

:::

Wir kreieren nun ein Image, bei welchem Umgebungsvariablen im Dockerfile gesetzt
werden. Umgebungsvariablen sind nützlich, um z.B. eine Applikation zu
konfigurieren, oder um Credentials auf eine sichere Art und Weise zur Verfügung
zu stellen. So kann man in einer Umgebungsvariable die URL zu einer Datenbank
und in einer weiteren Umgebungsvariablen das Passwort der Datenbank speichern.

- Kreieren Sie ein _Dockerfile_, welches auf `ubuntu` basiert.
- Setzen Sie die Umgebungsvariablen `VERSION="1.0"`, `MY_NAME="Ihr Name"`.
  - Sie können alle Umgebungsvariablen mit dem Befehl `env` ausgeben.
- Erstellen Sie das Image mit dem Tag `-t uebung09`.
- Erstellen Sie einen Container mit dem Befehl `docker run -it --rm uebung09`.
  Sie sollten unter anderem die von Ihnen gesetzten Umgebungsvariablen sehen.
- Mit `docker image inspect uebung09` sollten Sie unter Config einen Unterpunkt
  mit dem Namen Env finden, wo Sie die von Ihnen gesetzten Umgebungsvariablen
  sehen können.
