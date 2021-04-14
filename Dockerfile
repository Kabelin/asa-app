FROM node:12

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# --production flag can be used for installing just prod dependencies
RUN npm install

# Copy main files
COPY . .

RUN chmod +x ./wait-for-it.sh ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD [ "npm", "run", "dev" ]
