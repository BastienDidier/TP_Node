var async  = require('async');
var City   = require("../shared_models/City.js");


module.exports = function (req, res, next) {


async.waterfall([

        function (wcb) {
            var wdatas= {

            	city: req.body.city

            	};

            return wcb(null,wdatas);
        },

      find_city,
      insert_city
    ],
    function(error,result){

        if(error || !result){

            console.log(error);
            console.log("[Controllers][post_cities]"+error)
            return res.status(500).json({error: true});

        }else{

        	return res.status(200).json({success: true});

        }

    });
};


var find_city = function(wdatas, wcb)
{

	var city = wdatas.city;
	City.findOne({ville: city},function(err,ville){

		if(err)
		{
			console.log(err);
			return wcb("[find_city]"+err,wdatas);
		}
		else
		{
			if(ville)
			{
				return wcb("[already exist]",wdatas);
			}
			else
			{
				return wcb(null,wdatas);
			}
		}
	})

}



var insert_city = function(wdatas, wcb)
{
	var ville = wdatas.city;
	var city = new City({
		ville : ville
	})

	city.save(function(err, city)
	{

		if(err || !city)
		{
			console.log(err);
			return wcb("[insert_city]",wdatas);
		}
		else
		{
			return wcb(null,wdatas);
		}

	})
}
