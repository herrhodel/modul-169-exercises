## Netzwerk Grundlagen

:::caution

- Diese Übung wurde hinzugefügt, die Nummerierung verschiebt sich!
- Euere Kopie vom excercises Repository ist bestimmt hinten nach.
- Ordner Uebung06 nach Uebung07 und Uebung07 nach Uebung08 umbenennen.

:::

Hier geht es darum wie mehrere Dockercontainer untereinander kommunizieren
können. Beispielsweise muss ein Web-Container mit einem Datenbank-Container
kommunizieren können und an seine Daten zu kommen.

Der Befehl

```bash
docker network ls
```

zeigt die vorhandenen Netzwerke an.

```bash
vmadmin@ubuntu:~$ docker network ls
NETWORK ID   NAME   DRIVER SCOPE
65593a9ebb3b bridge bridge local
364521a9eaa2 host   host   local
c69c18f0a974 none   null   local

```

## Standardnetzwerk

Das Netzwerk mit dem Namen bridge ist das Standardnetzwerk und wird verwendet,
wenn nichts anderes angegeben wird. Die Netzwerkarchitektur lässt sich wie folgt
darstellen:

!!!bild!!! 1.7.1 Abb. 1: Bridge Netzwerk

Wir wollen diese Architektur nun nachvollziehen: Die Ausgabe von `ifconfig` auf
dem Host zeigt unter anderem das **docker0** interface an:

:::info

- **docker0** wird nur **auf Linux** angezeigt.

:::

```
vmadmin@ubuntu:~$ ifconfig
...
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500
      // highlight-next-line
      inet 172.17.0.1 netmask 255.255.0.0 broadcast 172.17.255.255
      inet6 fe80::42:f5ff:fe1c:4929 prefixlen 64 scopeid 0x20<link>
      ether 02:42:f5:1c:49:29 txqueuelen 0 (Ethernet) ...
```

Dort erkennt man die private Klasse B Schnittstelle, mit Namen `docker0` und der
IP-Adresse `172.17.0.1`. Diese Schnittstelle dient den Containern als
**Gateway**.

Wir starten nun einen Ubuntu-Container. Dabei wird interaktiv (-it) eine
Bash-Shell im Container geöffnet:

```bash
docker run -it --name ubuntu_1 ubuntu:latest
```

Der Container lässt sich mit `exit` beenden und kann mit folgendem Befehl wieder
neu gestartet werden.

```bash
docker start -i ubuntu_1
```

In einer **zweiten Konsole** kann nun das Kommando

```bash
docker network inspect bridge
```

ausgeführt werden:

```bash
docker network inspect bridge
```

```json
[
  {
    "Name": "bridge",
    "Id": "65593a9ebb3b25cb368166ff8dc0f3556cd5edf29cbc88286fc38dfa5068594c",
    "Created": "2022-06-25T07:03:44.321727785+02:00",
    "Scope": "local",
    "Driver": "bridge",
    "EnableIPv6": false,
    "IPAM": {
      "Driver": "default",
      "Options": null,
      // highlight-next-line
      "Config": [{ "Subnet": "172.17.0.0/16", "Gateway": "172.17.0.1" }]
    },
    "Internal": false,
    "Attachable": false,
    "Ingress": false,
    "ConfigFrom": { "Network": "" },
    "ConfigOnly": false,
    "Containers": {
      "5fe8760946479f29c3b59470a7a7a23e80ea8c0689f04d1fa4d40c5f668b51c8": {
        // highlight-next-line
        "Name": "ubuntu_1",
        "EndpointID": "194b76a3cd7a3360c054ad752a322822bf122d1544fd3266b49e55e116eda643",
        "MacAddress": "02:42:ac:11:00:02",
        // highlight-next-line
        "IPv4Address": "172.17.0.2/16",
        "IPv6Address": ""
      }
    },
    "Options": {
      "com.docker.network.bridge.default_bridge": "true",
      "com.docker.network.bridge.enable_icc": "true",
      "com.docker.network.bridge.enable_ip_masquerade": "true",
      "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
      "com.docker.network.bridge.name": "docker0",
      "com.docker.network.driver.mtu": "1500"
    },
    "Labels": {}
  }
]
```

Hier erkennt man die Definition des Klasse B Netzwerkes 172.17.0.0/16 und die
IP-Adresse des Containers ubuntu_1

## Eigene Netzwerke

Alle Container landen standardmässig im selben Netzwerk, dem bridge-Netzwerk.
Dies ist aus sicherheitstechnischen Gründen nciht ideal, wenn unterschiedliche
Anwendungen voneinander isoliert sein sollen. Es lassen sich deshalb eigene
Netzwerke definieren und diese den Containern zuordnen.

```bash
docker network create \
  --driver=bridge \
  --subnet=10.10.10.0/24 \
  --gateway=10.10.10.1 \
  my_net
```

Überprüfen mit

```bash
docker network ls
```

```bash title="Ausgabe"
NETWORK ID   NAME   DRIVER SCOPE
65593a9ebb3b bridge bridge local
364521a9eaa2 host   host   local
// highlight-next-line
049d1ccb15e7 my_net bridge local
```

ifconfig zeigt die neue Schnittstelle an:

:::info

- nur **auf Linux**!

:::

```bash
ifconfig
...
br-049d1ccb15e7: flags=4099<UP,BROADCAST,MULTICAST> mtu 1500
    inet 10.10.10.1 netmask 255.255.255.0 broadcast 10.10.10.255
    ether 02:42:88:5d:17:1e txqueuelen 0 (Ethernet)
...
```

Ein Container kann nun beim Start diesem Netzwerk zugeordnet werden:

```bash
docker run -it --name ubuntu_2 --network=my_net ubuntu
```

und

```bash
docker network inspect my_net
```

zeigt die IP-Adresse des neuen Containers

```bash
docker network inspect my_net
```

```json
...
        "Config": [
          {
// highlight-next-line
            "Subnet": "10.10.10.0/24",
// highlight-next-line
            "Gateway": "10.10.10.1"
...
    "Containers": {
      "8848cacd27a445a7805e34bed6542c21535aa5e7cbb370e4cae7e26cd7d19f15": {
// highlight-next-line
        "Name": "ubuntu_2",
        "EndpointID": "1bf43446a8b4a23efb6af2780556fa5566a7e18c09c189b97341dedfa1f474b0",
        "MacAddress": "02:42:0a:0a:0a:02",
// highlight-next-line
        "IPv4Address": "10.10.10.2/24",
...
```

Die IP-Adresse für den Container wird dabei von docker via DHCP aus dem
definierten Netzwerk vergeben. Alternativ kann eine fixe IP-Adresse beim Start
des Containers angegeben werden.

```bash
docker run -it --name ubuntu_2 --ip="10.10.10.10" --network=my_net ubuntu
```

Als Nächstes soll der weiter oben dem Netzwerk bridge zugeordnete Container
ubuntu_1 dem Netzwerk `my_net` zugeordnet werden. Dazu trennen wir ihn zuerst
von bridge mit

```bash
docker network disconnect bridge ubuntu_1
```

anschliessend wird er zu my_net hinzugefügt und neu gestartet

```bash
docker network connect my_net ubuntu_1 docker start -i ubuntu_1
```

docker inspect zeigt nun beide Container an:

```bash
docker network inspect my_net
```

```json
...
    "Containers": {
        "5fe8760946479f29c3b59470a7a7a23e80ea8c0689f04d1fa4d40c5f668b51c8": {
          "Name": "ubuntu_1",
          "EndpointID": "9212735dd2214ab7fa18fadc13a7bac348582e1ddd7d0d70ee9f58f308271000",
          "MacAddress": "02:42:0a:0a:0a:03",
          "IPv4Address": "10.10.10.3/24",
          "IPv6Address": ""
        },
        "8848cacd27a445a7805e34bed6542c21535aa5e7cbb370e4cae7e26cd7d19f15": {
          "Name": "ubuntu_2",
          "EndpointID": "1bf43446a8b4a23efb6af2780556fa5566a7e18c09c189b97341dedfa1f474b0",
          "MacAddress": "02:42:0a:0a:0a:02",
          "IPv4Address": "10.10.10.2/24",
          "IPv6Address": ""
        }

      ...
```

Um zu überprüfen, ob die beiden Container tatsächlich miteinander kommunizieren
können, installieren wir auf ubuntu_1 das Paket iputils-ping:

```bash title="Terminal im Container ubuntu_1"
apt update
apt install iputils-ping
```

Anschliessend wird ubuntu_2 angepingt

```bash title="Terminal im Container ubuntu_1"
root@5fe876094647:/# ping 10.10.10.2
PING 10.10.10.2 (10.10.10.2) 56(84) bytes of data.
64 bytes from 10.10.10.2: icmp_seq=1 ttl=64 time=0.496 ms ...
```

Dabei ist es nicht einmal nötig die IP-Adresse von ubuntu_2 zu kennen, da man
auch den Namen direkt verwenden kann

```bash title="Terminal im Container ubuntu_1"
root@5fe876094647:/# ping ubuntu_2
PING ubuntu_2 (10.10.10.2) 56(84) bytes of data.
64 bytes from ubuntu_2.my_net (10.10.10.2): icmp_seq=1 ttl=64 time=0.099 ms ...
```

Nachdem alle Container, die zu einem Netzwerk hinzugefügt wurden, gestoppt oder
getrennt wurden, können Sie das Netzwerk mit folgendem Befehl löschen:

```bash
docker network rm my_net
```
