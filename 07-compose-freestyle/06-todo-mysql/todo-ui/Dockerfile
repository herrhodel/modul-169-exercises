# --- Build Stage ---
FROM node:25-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Serve Stage ---
FROM node:25-alpine

WORKDIR /app
RUN npm install -g vite 
COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
