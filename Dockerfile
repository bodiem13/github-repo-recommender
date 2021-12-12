# pull the official base image
FROM node:alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY ./ ./
# start app
CMD ["npm", "run", "start"]

#docker build -t github:react-app .
# docker run \
#     -it \
#     --rm \
#     -v ${PWD}:/app \
#     -v /app/node_modules \
#     -p 3001:3000 \
#     -e CHOKIDAR_USEPOLLING=true \
#     github:react-app