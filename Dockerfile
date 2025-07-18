# Backend Dockerfile
FROM node:18
WORKDIR /app
COPY server/package*.json ./
RUN npm install --legacy-peer-deps
COPY server/ ./
EXPOSE 8080
CMD ["npm", "start"]
