FROM node:latest as builder
WORKDIR /
COPY package.json /
RUN npm install
COPY . /
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]