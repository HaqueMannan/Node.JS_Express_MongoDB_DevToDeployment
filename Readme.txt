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
$: npm start                                                                  (Run the script called 'start' within Package.json file e.g. "scripts": { "start": "nodemon app.js"})
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
$: npm install --save method-override                                         (Use to override a html Form request methods without AJAX and extra javascript)
$: npm install --save express-session                                         (Used to create user sessions for the express web server to store the user state)
$: npm install --save connect-flash                                            (Used for flash messaging)
$: npm install --save bcryptjs                                                (Used for encrypting/hashing data. There are two npm packages bcrypt and bcryptjs. The latter is the simpler implementation)
$: npm install --save passport                                                (Used as an authentication middleware for Node.js)
$: npm install --save passport-local                                          (Used as an local authentication strategy used with the passport module)
$: npm install --save passport-google-oauth20                                 (Used as an Google OAuth authentication strategy used with the passport module)
$: npm install --save express-session                                         (Used for passport middleware which uses sessions)

Git Commands (while within the Project Directory within the terminal):
$: git init                                                                   (Git command to initialise a local repository)
$: git add .                                                                  (Git command to add all files to the repository)
$: git commit -am "{comment}"                                                 (Git command to add a useful descriptive comment for the commit)
$: git push heroku master                 

Heroku Toolbelt CLI Commands (while within the Project Directory within the terminal):
$: heroku login                                                               (Heroku command to login to an Heroku account)
$: heroku create                                                              (Heroku command to create the application in Heroku - Heroku will provide a random heroku-app-name)
$: heroku git:remote -a <heroku-app-name>                                     (Heroku command to create a remote to the Heroku app)
$: heroku open                                                                (Heroku command to open the live deployed app in the browser)

Important Info:
Use control + c keys on your keyboard to exit execution. Used to end the web-server code running continuously.
MongoDB must be running in the shell or as a background service (using mongod in order for the app.js to connect to the local MongoDB database).
MongoDB is schema-less (i.e. no schema required on the database level). It is good practice to define the schema on the application level which Mongoose allows you to do.
The MongoDB shell command will only work if the mongod service is running first. To end the MongoDB shell press control + c on your keyboard to end the process.

Preparing & Deploying App:
Within Package.json change the start script to "scripts": { "start": "node app.js"} - This is required for Heroku which will run the start script.
Rename the nodemon script with another name e.g. "scripts": { "start-dev": "node app.js"} - This ensures you can use nodemon in development.
Heroku decides which port to use for your app. Update the app.js port variable to use process.env or 5000. This will ensure the app can run in both Live and Development environments. Heroku will provide the port value in the  process.env.PORT variable.
Setup a Development and Production database.
   The Development database will point to: mongoose.connect('mongodb://localhost/vidjot-dev', {}
   You can use mLabs(https://mlab.com/login/) or MongoDB Atlas(https://www.mongodb.com/cloud/atlas) services for the Production database.
   To use the Production database, take the link provided by mLabs/MognoDB Atlas and plug it into the mongoose.connect('') method.
      For example, if using mLabs the link to plug in would look something like: ongoose.connect('mongodb://<dbuser>:<dbpassword>@ds141454.mlab.com:41454/vidjot-prod>', {}.
Within config, create a database.js file which will export the mongoURI link based on whether you are in Development or Production. This makes the app dynamic to select the correct database to use depending on which environment you are in. The database config can be loaded into the app.js file as seen in the code snippet below:

   <ProjectName>/config/database.js:
      if(process.env.NODE_ENV === 'production') {
         module.exports = { mongoURI: 'mongodb://<dbuser>:<dbpassword>@ds141454.mlab.com:41454/vidjot-prod>' }
      } else {
         module.exports = { mongoURI: 'mongodb://localhost/vidjot-dev' }
      };

   <ProjectName>/app.js:
      ...
      const db = require('./config/database');
      mongoose.connect(db.mongoURI), {}
      ...

Before deploying to Heroku, you need to create a Github account (https://github.com/) and install Git on your machine in order to create a local git repository for the applications. Heroku works by packaging the application in a local git repository which you then push to Heroku.
Create a .gitignore file to specify which files and folders to ignore when pushing the app to Heroku i.e. the /node_modules folder.
Install Heroku Toolbelt CLI (https://devcenter.heroku.com/articles/heroku-cli) to help with deployment to Heroku. Note on Windows the Heroku Toolbelt CLI does not work with gitbash terminal, use the normal Windows terminal running as administrator. Run the Heroku CLI commands while within in the Project Directory.
   After running the command to create the application in heroku, login to your Heroku account, click on the newly created app and then click on Deploy to find the commands you need to run in order to add the Heroku app remote to your computer, for example:
      $: heroku git:remote -a floating-cavern-88849
Finally, run the last git command to push the local git repository files up to the remote Heroku app server i.e. $: git push heroku master
The app is now live and deployed to the web using Heroku as the web provider. Heroku will provide a unique domain name (URL) to the app.

To add your own domain name you will need to find a domain name provider to purchase a domain name. Namecheap is one such provider (https://www.namecheap.com/) but it does not matter which domain name provider you use. The interface will look a little different but you should have similar options.
   Go to the DNS options (in Namecheap this is within the Advanced DNS option).
   Edit the CNAME Record option for the www host.
      You can update the Heroku App Domain Name URL by logging into your Heroku account and under settings tab scroll down to the Domains and Certificates section. Use the Add Domain button to add a domain name. To add a domain name you need a credit card on file which you can add to your Heroku account under Account Settings > Billing > Add Credit Card (it does not cost to add a domain name on file but it does require you to add your credit card on file). Add the domain name you have purchases/registered from your domain provider (e.g. from Namecheap) - include the www. version as well. Copy the DNS target from Heroku to paste it into the CNAME Record's value in your Domain Name Host provider's account Advanced DNS settings.
   Wait a little while (possibly half an hour or so) for the domain name connection to be setup between the two hosts.
You now have a custom domain name URL that links to your Heroku application.

You now have a live application fully deployed to the web which can accept live users.