var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Clouds's Rest", 
		image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
		description: "blah blah blah"
	},
	{
		name: "Desert Mesa", 
		image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104490f2c27ca1ebbcb0_340.jpg",
		description: "blah blah blah"
	},
	{
		name: "Canyon Floor", 
		image: "https://farm4.staticflickr.com/189/493046463_841a18169e.jpg",
		description: "blah blah blah"
	}
]
 
function seedDB(){
	Campground.remove({},function(err){
		// if(err){
		// 	console.log(err);
		// }else{
		// 	console.log("remove campgrounds");
		// 	// add few campgrounds
		// 	data.forEach(function(seed){
		// 		Campground.create(seed , (err, campground)=>{
		// 			if(err){
		// 				console.log(err);
		// 			}else{
		// 				console.log("added a campground");
		// 				//add few comments
		// 				Comment.create(
		// 				{
		// 					text: "This place is great, but I wish there was internet",
		// 					author: "Homer"
		// 				}, (err,comment)=>{
		// 					if(err){
		// 						console.log(err);
		// 					}else{
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log("added a comment");
		// 					}	
		// 				});
		// 			}
		// 		});
		// 	});
		// }
	});
	

}

module.exports = seedDB;