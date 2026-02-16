## HTML-Datei in einen Nginx-Container mounten

### Ziel

Sie erstellen eine eigene HTML-Datei in einem Ordner auf ihrem Host-System und
mounten diesen in einen Nginx-Container, sodass die Datei über den Webserver
zugänglich ist. Wenn Sie die Datei ändern, soll auch der Webinhalt geändert
werden.

### Schritte

#### 1. Starten Sie einen nginx-Container und betrachten Sie die Standard-Seite:

```bash
docker run --rm -p 8080:80 nginx
```

- Öffnen Sie einen Webbrowser und gehen Sie zu
  [http://localhost:8080](http://localhost:8080). Sie sollten die
  Standard-Webseite von nginx sehen.
- Stoppen Sie den Container mit `CTRL + c`.

#### 2. Erstellen Sie einen Ordner auf Ihrem Host-System:

- Erstellen Sie einen neuen Ordner mit dem Namen `html`, in dem Sie die
  HTML-Datei speichern möchten.

#### 3. Erstellen Sie eine HTML-Datei:

- Erstellen Sie eine einfache HTML-Datei in dem neu erstellten Ordner mit dem
  Namen index.html. Zum Beispiel:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Nginx-Seite</title>
  </head>

  <body>
    <h1>Willkommen auf meiner Webseite!</h1>
  </body>
</html>
```

#### 4. Starten Sie den Nginx-Container mit einem Bind Mount:

- Starten Sie den Nginx-Container und mounten Sie den Ordner, der die HTML-Datei
  enthält, in den Container. Verwenden Sie den folgenden Befehl:

```bash
docker run --rm -p 8080:80 -v ./html:/usr/share/nginx/html nginx
```

:::info

- auf Windows müssen `./html` mit `.\html` ersetzen

:::

#### 5. Überprüfen Sie die Nginx-Seite:

- Öffnen Sie einen Webbrowser und gehen Sie zu http://localhost:8080. Sie
  sollten die Nachricht "Willkommen auf meiner Webseite!" sehen.

#### 6. Ändern Sie die HTML-Datei:

- Ändern Sie die HTML-Datei auf Ihrem Host-System, um den Inhalt zu
  aktualisieren. Zum Beispiel:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Nginx-Seite</title>
  </head>

  <body>
    <h1>Willkommen auf meiner Webseite!</h1>

    <p>Hier ist mein Text.</p>
  </body>
</html>
```

#### 7. Aktualisieren Sie die Nginx-Seite:

- Aktualisieren Sie die Seite im Webbrowser. Sie sollten zusätzlich "Hier ist
  mein Text" sehen.
