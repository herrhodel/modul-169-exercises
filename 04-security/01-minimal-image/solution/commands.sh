docker build -t minimal-image .
docker run -p 8080:80 minimal-image

## oder

docker run -p 8080:80 nginx
