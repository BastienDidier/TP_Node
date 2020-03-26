var async=require('async');
var fs = require("fs");
var uuid = require("uuid");


module.exports = function (req, res, next) {


async.waterfall([

        function (wcb) {
            var wdatas= {

            	city: req.query.city,
            	id:   req.params.id,
            	path: 	__dirname+"/../config/cities.json"

            	};

            return wcb(null,wdatas);
        },

        check_cities,
        create_cities,
        verify_city,
        add_city

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



var check_cities = function(wdatas, wcb)
{

	var path = wdatas.path;
	fs.access(path,function(error)
	{
		if (error) {
			wdatas.to_create = true;
			wdatas.cities = {};
			return wcb(null,wdatas);
		}
		else
		{
			wdatas.to_create = false;
			wdatas.cities = require(path);
			return wcb(null,wdatas);
		}
	})

}



var create_cities = function(wdatas, wcb)
{

	var cities = wdatas.cities;
	var path   = wdatas.path;
	var to_create = wdatas.to_create;

	if(to_create)
	{

		fs.writeFile(path,cities,function(error)
		{

			if(error)
			{
				console.log(error)
				return wcb("[create_cities]"+error,wdatas);
			}
			else
			{
				return wcb(null, wdatas);
			}

		})
	}
	else
	{
		return  wcb(null, wdatas);
	}
}


var verify_city = function(wdatas, wcb)
{
	var cities = wdatas.cities;
	if(cities["cities"])
	{

		return wcb(null,wdatas);

	}
	else
	{
		cities["cities"] =[];
		wdatas.cities = cities;
		return wcb(null,wdatas);
	}
}



var add_city = function(wdatas,wcb)
{

	var cities 	= wdatas.cities["cities"].filter(function(citi){

		return citi.id == wdatas.id ? false : true;
	});

	var path 	= wdatas.path;
	var new_city = {

		id: 	wdatas.id,
		name : 	wdatas.city,

	}

	cities.push(new_city);
	wdatas.cities["cities"] = cities
	fs.writeFile(path,JSON.stringify(wdatas.cities),function(error){

		if(error)
		{
			console.log(error);
			return  wcb("[add_city]"+error);
		}
		else
		{

			return wcb(null,wdatas);

		}

	})
}