# What image do you want to start building on?
FROM node:latest

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# What source code do you what to copy, and where to put it?
WORKDIR .

COPY . .

RUN npm install --production

# What port will the container talk to the outside world with once created?
EXPOSE 3001:3001

# How do you start your app?
CMD npm run start-server