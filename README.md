# Github Repository Recommender

https://img.shields.io/badge/node-v12.18.3-blue
https://img.shields.io/badge/npm-v6.14.6-blue

## Docker

### Build Docker image
`docker build -t github:react-app .` 

### Run React app through Docker
`docker run -p 3001:3000 github:react-app`

### Run with more parameters
```
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    github:react-app
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
