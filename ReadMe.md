This project of web store is created using webpack technologies.
To install webpack you need to load npm in terminal first:

npm i

Next command starts the script of creating bundle.js that contains main.js and all imports in it:

npm run build

After that you need to start webpack-dev-server to run the app:

npm run start

The app is acceptable on http://localhost:8080/.
This project uses json-server to simulate database of users and goods.

Terminal command to load json-server:
sudo npm install -g json-server

Terminal command to start json-server:
json-server --watch db.json

The resources of database is acceptable on http://localhost:3000/.

http://localhost:3000/users

http://localhost:3000/goods
