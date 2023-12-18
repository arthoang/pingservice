# Dockerfile

FROM node:19-bullseye
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY src/package.json src/package-lock.json .
RUN npm install
COPY src/ .
EXPOSE 3900
CMD [ "npm", "start"]