var async  = require('async');
var fs 	   = require("fs");




module.exports = function (req, res, next) {


async.waterfall([

        function (wcb) {
            var wdatas= {

            	};

            return wcb(null,wdatas);
        },
        check_cities,
    ],
    function(error,result){
        if(error || !result){

            console.log(error);
            console.log("[Controllers][get_cities]"+error)
            return res.status(500).json({});

        }else{

        	return res.status(200).json(result.cities);

        }

    });
};



var check_cities = function(wdatas , wcb)
{
	var path = __dirname+"/../config/cities.json";
	fs.access(path,function(error)
	{
		if (error) {
			console.log(error);
			return wcb("[check_cities]"+error,wdatas);
		}
		else
		{
			wdatas.cities = require(path);
			return wcb(null,wdatas);
		}
	})
}