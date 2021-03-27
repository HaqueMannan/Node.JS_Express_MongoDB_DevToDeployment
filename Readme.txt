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

Node Packages/App Dependencies:
Node Command:                                                                 Package Description:
$: npm install --save express                                                 (Used to create a NodeJS  web-server)
$: npm install --save-dev nodemon                                             (Used to auto-restart web-server whenever file change detected. Saved as dev dependency using --save-dev flag)
$: npm install --save express-handlebars                                      (Used as a server-side HTML template engine. Other template engine libraries: ejs and pug)

Important Info:
Use control + c keys on your keyboard to exit execution. Used to end the web-server code running continuously.