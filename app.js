var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	env = require('dotenv').config(),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seed");

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

console.log(process.env.DATABASEURL);
mongoose.connect('process.env.DATABASEURL', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
mongoose.set("useFindAndModify", false);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: "smileyx",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass user data for every routes
app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, (req, res) => {
	console.log("Server started Version 9");
});
// app.listen(3000);
