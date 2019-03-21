var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get('/', (req, res) => {
	res.render('landing');
});

//show register form
router.get("/register", (req, res)=>{
	res.render("register");
});

//handle registration
router.post("/register", (req, res)=>{
	var newUser = new User({username: req.body.username})
	User.register( newUser, req.body.password, (err,user)=>{
		if(err){
			console.log(err);
			req.flash("error", err.message);
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, ()=>{
			req.flash("success", "Login Successfully, Hi, " + user.username);
			res.redirect("/campgrounds");
		});
	})
})

//show login form
router.get("/login", (req, res)=>{
	res.render("login");
})

//handle authentication
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
}),(req, res)=>{ 
	//do nothing
});

//logout
router.get("/logout", (req, res)=>{
	req.logout();
	req.flash("success", "You Have Logged Out!");
	res.redirect('/campgrounds');
});

module.exports = router;