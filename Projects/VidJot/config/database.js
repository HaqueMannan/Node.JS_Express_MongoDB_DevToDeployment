if(process.env.NODE_ENV === 'production') {
   module.exports = { mongoURI: 'mongodb://<dbuser>:<dbpassword>@ds141454.mlab.com:41454/vidjot-prod>' }
} else {
   module.exports = { mongoURI: 'mongodb://localhost/vidjot-dev' }
};