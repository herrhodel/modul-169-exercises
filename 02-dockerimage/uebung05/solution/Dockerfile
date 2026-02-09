# Use the latest Alpine image
FROM alpine:3.20

# Update the package index and install Python 3 and pip
RUN apk add --no-cache python3
RUN apk add --no-cache py3-pip

# Set the working directory
WORKDIR /app

CMD ["python3"]
