FROM node:16
WORKDIR /opt/front
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build