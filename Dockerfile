FROM node:20
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app
LABEL org.opencontainers.image.source https://github.com/NeonGamerBot-QK/crc
# RUN npm install
# If you are building your code for production
RUN npm ci --omit=dev
COPY . /app
EXPOSE 3000
RUN npm run build
CMD [ "npm", "start" ]
