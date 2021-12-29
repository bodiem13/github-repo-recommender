# set node version
FROM node:12.18.3

# set working direction
WORKDIR /app

# install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i

# add app
COPY ./ ./

# start app
CMD ["npm", "run", "start"]