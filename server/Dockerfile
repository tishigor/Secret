FROM node:lts-buster-slim AS development
# Create app directory
WORKDIR /app
# Install requirements
# COPY package*.json ./ ???
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
COPY . /app
EXPOSE 3000
CMD [ "npm", "run", "start" ]