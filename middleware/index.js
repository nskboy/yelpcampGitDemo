var Campground = require("../models/campground");
var Comment = require("../models/comment");
//All the middleware goes here
var middlewareObj = {

	checkCampgroundOwnership: (req, res, next)=>{
		if(req.isAuthenticated()){
			Campground.findById(req.params.id, (err, campground)=>{
				if(err){
					req.flash("error", "Campground not found");
					res.redirect("back");
				}else{
					// does user own the campground?
					if(campground.author.id.equals(req.user._id)){
						next();
					}else{
						req.flash("error", "Permission Denied");
						//otherwise redirect
						res.redirect("back");
					}
				}
			});
		}else{
			req.flash("error", "You have to log in to do that");
			res.redirect("back");
		}
	},
	checkCommentOwnership: (req, res, next)=>{
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, (err, comment)=>{
				if(err){
					req.flash("error", "Campground not found");
					res.redirect("back");
				}else{
					// does user own the campground?
					if(comment.author.id.equals(req.user._id)){
						next();
					}else{
						req.flash("error", "Permission Denied");
						//otherwise redirect
						res.redirect("back");
					}
				}
			});
		}else{
			req.flash("error", "You have to log in to do that");
			res.redirect("back");
		}
	},
	//LoginCheck middleware
    isLoggedIn: (req, res, next)=>{
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("error", "You have to log in to do that");
		res.redirect("/login");
	}
};

module.exports = middlewareObj;