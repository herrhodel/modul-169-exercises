FROM ubuntu:24.04
LABEL Author="Michael Salm"

RUN apt-get update && apt-get -y upgrade && \
    apt-get install -y nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
