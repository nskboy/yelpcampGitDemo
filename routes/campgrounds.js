var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//Show all campgrounds
router.get('/', (req, res) => {

	//Get all campgrounds from database
	Campground.find({}, (err,campgrounds) => {
		if(err){
			req.flash("error", "Campground not found");
		}else{
			res.render('campgrounds/index', {data: campgrounds});
		}
	})
});

//add new campground
router.get('/new', middleware.isLoggedIn, (req, res)=>{
	res.render('campgrounds/new');
});

//create new campground
router.post('/', middleware.isLoggedIn, (req, res) => {
	var name = req.body.campground;
	var image = req.body.image;
	var description = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var campground = {name: name, image: image, description: description, price: price, author: author};
	//Save to database

	Campground.create(campground, (err, data)=>{
		if(err){
			console.log(err);
		}else{
			res.redirect('/campgrounds');
		}
	})
});

//show individual information when button clicked
router.get("/:id", (req, res) => {
	//find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, data) => {
		if(err){
			console.log(err);
		}else{
			//render show template with information for the campground
			res.render("campgrounds/show", {data: data});
		}
	});
});

//Edit Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		res.render("campgrounds/edit", {campground: campground});
	});
});

//Update Campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
	//find and update
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + campground._id);
		}
	})
	//redirect somewhere
});

//Delete campground route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
})

module.exports = router;
