# Github Repository Recommender

<a href="#"><img src="https://img.shields.io/badge/node-v16.13.2-blue"></a>
<a href="#"><img src="https://img.shields.io/badge/npm-v8.1.2-blue"></a>

## Docker

### Run React app through Docker
1. `docker build -t github:react-app .`
2. `docker run -p 3001:3000 github:react-app`
3. [View github recommender here](http://localhost:3001)

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
