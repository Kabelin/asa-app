FROM node:12

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Do migrations to database
# Build project with sucrase inside the src folder
# Ps: index.js is now inside of a src folder
RUN npx sucrase ./src -d ./build --transforms imports

EXPOSE 3000

CMD [ "node", "./build/server.js" ]
