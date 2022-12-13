const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");



//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comments", commentRoutes);

//Assign Route
app.use('/', (req, res, next) => {
	res.send('Node.js Search and Filter');
});

//Server Running
app.listen(process.env.PORT, () => {
	console.log(`Server is running on PORT ${process.env.PORT}, you better catch it!`);
});

app.get('/auth/coinbase',
  passport.authenticate('coinbase'));

app.get('/auth/coinbase/callback', 
  passport.authenticate('coinbase', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

  app.get('/login/coinbase/return', (req, res, next) => {
	return passport.authenticate('coinbase', { failureRedirect: '/' }, (err, user, info) => {
		if (err) {
			res.redirect('/error');
		} else {
			req.session.save(() => {
				res.redirect('/feed');
			});
		}
		next();
	})(req, res, next);



	app.get("/callback", async (req, res) => {
		const { code, state } = req.query;
		if (state === SECRET) {
		  const data = qs.stringify({
			'grant_type': 'authorization_code',
			'code': code,
			'client_id': COINBASE_CLIENT_ID,
			'client_secret': COINBASE_CLIENT_SECRET,
			'redirect_uri': REDIRECT_URI
		  });
		  const config = {
			method: 'post',
			url: '<https://api.coinbase.com/oauth/token>',
			headers: {
			  'Content-Type': 'application/x-www-form-urlencoded'
			},
			data
		  };
	  
		  try {
			const response = await axios(config);
	  
			// saving tokens for other requests
			accessToken = response.data.access_token;
			refreshToken = response.data.refresh_token;
	  
			res.send({ response: response?.data });
		  } catch (e) {
			console.log("Could not trade code for tokens", e.response.data)
		  }
		}
	  });

	  // Gets the user details
app.get("/user", async (req, res) => {
	const config = {
	  method: 'get',
	  url: 'https://api.coinbase.com/v2/user',
	  headers: {
		'Authorization': `Bearer ${accessToken}`
	  }
	};
  
	try {
	  const response = await axios(config);
	  res.send({ response: response?.data })
	} catch (e) {
	  console.log("Could not get user", e.response.data)
	}
  });

});