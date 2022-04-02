# Github Repository Recommender

<a href="#"><img src="https://img.shields.io/badge/node-v16.13.2-blue"></a>
<a href="#"><img src="https://img.shields.io/badge/npm-v8.1.2-blue"></a>

## Run app with `npm`

### `npm install`

Installs package dependencies for running application.


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Docker

### Run React app through Docker
1. `docker build -t github:react-app .`
2. ```
    docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    github:react-app
    ```
3. [View github recommender here](http://localhost:3001)

