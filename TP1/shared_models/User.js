var mongoose=require("mongoose")
User=new mongoose.Schema({
    nom:   		{type:String,default:" "},
    ville:    	{type:String,default: " "}
});

User.index({ville:1});
module.exports=mongoose.model('User',User);