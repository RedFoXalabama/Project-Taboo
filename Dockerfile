FROM node:20

WORKDIR /app
COPY . /app/
RUN npm install
WORKDIR /app/project-taboo
RUN npm install
RUN npm run build
WORKDIR /app

CMD ["node", "server.js"]