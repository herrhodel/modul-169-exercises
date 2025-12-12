# Stage 1: Build stage
FROM python:3.9-slim AS builder

# Create a directory for our files
WORKDIR /app

# Copy the Python script into the container
COPY generate_files.py .

# Run the Python script to generate files
RUN python generate_files.py

# Stage 2: Runtime stage
FROM python:3.9-slim

# Create a directory for our files
WORKDIR /app

# Copy the generated txt files from the builder stage
COPY --from=builder /app/*.txt .

# Command to display the contents of the files
CMD ["cat", "file1.txt", "file2.txt", "file3.txt"]

