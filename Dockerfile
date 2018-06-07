FROM node:8.11.1-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN ["npm", "install", "--only=production"]

# Bundle app source
COPY . .

ENV PORT=8080 NODE_ENV=production
EXPOSE 8080

CMD [ "node", "bin/www", "--migrate" ]