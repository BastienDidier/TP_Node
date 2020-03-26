var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tuto");

mongoose.connection.on("error",function(err)
{

	console.log(err);
	console.log("=> Error")
	process.exit(0);
})

mongoose.connection.on("connected", function()
{
	console.log("=>  connected");
	main();

})


function main()
{

	console.log("main launched");
}