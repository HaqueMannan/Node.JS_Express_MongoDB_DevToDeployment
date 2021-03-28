Dev Environment Installations:
- VS Code
- Node.JS
- MongoDB

Web Hosting & Database:
- Heroku: https://signup.heroku.com/?c=70130000000NeLCAA0&gclid=EAIaIQobChMIpYf3uJ2_7wIVievtCh06HQo9EAAYASAAEgLf1_D_BwE (For hosting the App on the Web)
- MLab: https://mlab.com/ (MongodDB Database)
Both have free tier sandbox environments and can be scaled up with paid options.

Useful Commands (while within the Project Directory within the terminal):
Command:                                                                      Description:
$: npm init                                                                   (Initialise a new node project i.e. package.json file)
$: node app                                                                   (Run app.js file i.e. entry point for the app)
$: npm start                                                                  (Run the script called 'start' within Package.json file e.g. "scripts": { "start": "nodemon app.js"}
$: brew services start mongodb-community@4.4                                  (Run MongoDB as a MacOS service)
$: brew services stop mongodb-community@4.4                                   (Stop MongoDB running as a MacOS service)
$: mongod --config /usr/local/etc/mongod.conf                                  (Run MongoDB manually as background service)
$: use admin   $:db.shutdownServer()                                          (Stop MongoDB manual background service)
$: mongo                                                                      (MongoDB shell to view database. This command only works when MongoDB services is running)
$: show dbs                                                                   (MongoDB shell command to view/list databases)
$: use {dbName}                                                               (MongoDB shell command to switch to the named database. Placeholder not part of the command: {dbName})
$: show collections                                                           (MongoDB shell command to show collections within a selected database)
$: db.{collectionName}.find()                                                  (MongoDB shell command to show all data within the collection. Placeholder not part of the command: {collectionName})

Node Packages/App Dependencies:
Node Command:                                                                 Package Description:
$: npm install --save express                                                 (Used to create a NodeJS  web-server)
$: npm install --save-dev nodemon                                             (Used to auto-restart web-server whenever file change detected. Saved as dev dependency using --save-dev flag)
$: npm install --save express-handlebars                                      (Used as a server-side HTML template engine. Other template engine libraries: ejs and pug)
$: npm install --save mongoose                                                (Interface to MongoDB database - local or remote database)
S: npm install --save body-parser                                             (Use as a middleware to parse HTML form data into the POST request)

Important Info:
Use control + c keys on your keyboard to exit execution. Used to end the web-server code running continuously.
MongoDB must be running in the shell or as a background service (using mongod in order for the app.js to connect to the local MongoDB database).
MongoDB is schema-less (i.e. no schema required on the database level). It is good practice to define the schema on the application level which Mongoose allows you to do.
The MongoDB shell command will only work if the mongod service is running first. To end the MongoDB shell press control + c on your keyboard to end the process.