## ToDo-App mit SQLite und ReactJS

Diese Web-Applikation verwaltet ToDo-Items. Die Daten werden in einer SQLite
Datenbank gespeichert. Das Frontend wurde mit dem ReactJS-Framework realisiert.

### Level 1

Erstelle ein Docker-Compose-File, das die Web-Applikation in einem Container
startet und den Port 3000 freigibt.

### Level 2

Im Container wird die SQLite Datenbank in einem Verzeichnis `/etc/todos`
gespeichert. Erstelle ein Docker-Volume und sorge dafür, dass die Daten der
SQLite Datenbank in das Volume geschrieben werden (Volume Mount).

### Level 3

Zudem soll das aktuelle Verzeichnis in den Container gemountet werden, sodass
Änderungen am Code sofort sichtbar sind. (Denke daran, das Verzeichnis
`/app/node_modules` auszuschliessen!)
