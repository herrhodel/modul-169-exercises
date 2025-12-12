# Use the latest Alpine image
FROM alpine:latest

# Update the package index and install Python 3.12 and pip
RUN apk add --no-cache \
    python3=3.12.8-r1 \
    py3-pip

# Set the working directory
WORKDIR /app

CMD ["python3"]
