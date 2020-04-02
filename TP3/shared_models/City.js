var mongoose=require("mongoose")
City=new mongoose.Schema({
    ville:    	{type:String,default: " "}
});

City.index({ville:1});
module.exports=mongoose.model('City',City);