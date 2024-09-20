FROM node:20

WORKDIR /app
COPY . /app/
WORKDIR /app/Backend
RUN npm install
WORKDIR /app/Frontend
RUN npm install
RUN npm run build
WORKDIR /app/Backend

CMD ["node", "server.js"]