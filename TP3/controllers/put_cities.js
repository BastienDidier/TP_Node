var async  = require('async');
var City   = require("../shared_models/City.js");


module.exports = function (req, res, next) {

async.waterfall([

        function (wcb) {
            var wdatas= {

            	city: req.query.city,
            	id:   req.params.id,

            	};

            return wcb(null,wdatas);
        },

        update_city

    ],
    function(error,result){

        if(error || !result){

            console.log(error);
            console.log("[Controllers][put_cities]"+error)
            return res.status(500).json({error: true});

        }else{

        	return res.status(200).json({success: true});

        }

    });
};



var update_city = function(wdatas, wcb)
{
	var city = wdatas.city;
	var id   = wdatas.id;

	City.update({_id: id.toString()},{ville: city},{upsert:false,multi:false},function(err,data){

		if(err || !data)
		{
			console.log(err);
			return wcb("[update_city]"+err,wdatas);
		}
		else
		{
			console.log(data);
			return wcb(null,wdatas);
		}

	})
	
}
