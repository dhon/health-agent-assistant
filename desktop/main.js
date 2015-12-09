var express = require('express');
var handlebars = require('express-handlebars');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var es = require('./node_modules/connect-ensure-login/lib/ensureLoggedIn')
var crypto = require('crypto');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {

    var hashed = crypto.createHash('md5').update(password).digest('hex');

    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      //if (!user) { return cb(null, false, { message: 'Invalid username ' + username }); }
      //if (user.password != password) { return cb(null, false, { message: 'Invalid password' }); }
      if (!user || user.password != hashed) { return cb(null, false, { message: "Invalid username, password combination"})}
      return cb(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

//var view = handlebars.create({ defaultLayout: null });
var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(require('connect-flash')());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/data', require('./routes/data-routes'));
app.use('/mapping', require('./routes/mapping-routes'));
app.use('/searching', require('./routes/searching-routes'));
app.use('/admin', require('./routes/admin-routes'));

// Define routes.
app.get('/',
  function(req, res) {
    if(req.user==undefined){
      res.render('home', { user: req.user, username:"" });
    }
    else{
      res.render('home', { user: req.user, username:req.user.username });
    }
  });

app.get('/login',
  function(req, res){
    res.render('login', { message: req.flash('error') });
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user,id:req.user.id, username:req.user.username,displayName:req.user.displayName,emails:req.user.emails });
  });

//// API calls to and from database
function addLocation(location){
$.ajax({
 type: "POST",
 url: './api/add',
 data: location,
 success: function(msg){
      alert('Success ' + msg);
     },
 dataType: "json"
});
}

function editLocation(location, id){
$.ajax({
 type: "POST",
 url: './api/edit',
 data: {
  'location': location.location,
  'type': location.type,
  'Name': location.name,
  'Address': location.address,
  'Telephone': location.telephone,
  'Owner': location.owner,
  'Person': location.person,
  'id': location.id
 },
 success: function(msg){
      alert('Success ' + msg);
     },
 dataType: "json"
});
}

function removeLocation(location){
$.ajax({
 type: "POST",
 url: './api/remove',
 data: {
  'location': location.location,
  'type': location.type,
  'id': location.id
 },
 success: function(msg){
      alert('Success ' + msg);
     },
 dataType: "json"
});
}

function getLocation(location){
$.ajax({
 type: "GET",
 url: './api/get',
 data: location,
 success: function(msg){
      alert('Success ' + msg);
     },
 dataType: "json"
});
}

function getDatabase(location){
$.ajax({
 type: "GET",
 url: './api/database',
 data: location.location,
 success: function(msg){
      alert('Success ' + msg);
     },
 dataType: "json"
});
}

app.listen(3000);
console.log("listen to local:3000");
