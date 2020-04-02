var async  = require('async');
var City   = require("../shared_models/City.js");

module.exports = function (req, res, next) {


async.waterfall([

        function (wcb) {
            var wdatas= {

            	id:   req.params.id,

            	};

            return wcb(null,wdatas);
        },

        remove_city

    ],
    function(error,result){

        if(error || !result){

            console.log(error);
            console.log("[Controllers][delete_cities]"+error)
            return res.status(500).json({error: true});

        }else{

        	return res.status(200).json({success: true});

        }

    });
};



var remove_city = function(wdatas, wcb)
{
	var id = wdatas.id;
	City.remove({_id: id.toString()},function(err){

		if(err)
		{
			console.log(err);
			return wcb("[remove_city]"+err,wdatas);
		}
		else
		{
			return wcb(null,wdatas);
		}

	})

}
