var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Show Comment form
router.get("/new", middleware.isLoggedIn, (req, res)=>{
	//find campground by id
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			req.flash("error", "Campground not found");
		}else{
			res.render("comments/new", {campground: campground});
		}
	});
});

//Create Comment
router.post("/", middleware.isLoggedIn, (req, res)=>{
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					req.flash("error", "Comment not found");
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "Comment added successfully");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});	
});

//Edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findById(req.params.comment_id, (err, comment)=>{
		if(err){
			req.flash("error", "Comment not found");
			res.redirect("back");
		}else{
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});
		}
	});
});

//update comment route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment)=>{
		if(err){
			req.flash("error", "Comment not found");
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

//delete comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err){
			req.flash("error", "Comment not found");
			res.redirect("back");
		}else{
			req.flash("success", "Comment removed succesfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})



module.exports = router;