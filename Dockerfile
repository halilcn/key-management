FROM node:16.14.0-alpine
COPY package*.json ./
RUN npm install
COPY . .
ENV MONGO_DB_URI=mongodb://mongo:27017/key-manager
CMD ["npm","run","dev"]