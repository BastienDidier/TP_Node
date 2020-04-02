var async  = require('async');
var City   = require("../shared_models/City.js");



module.exports = function (req, res, next) {


    async.waterfall([

        function (wcb) {
            var wdatas= {

            	};

            return wcb(null,wdatas);
        },

        find_cities,
    ],
    function(error,result){
        if(error || !result){

            console.log(error);
            console.log("[Controllers][get_cities]"+error)
            return res.status(500).json({});

        }else{

        	return res.status(200).json(result.list_city);

        }

    });
};



var find_cities = function(wdatas, wcb)
{       

    City.find({},function(err,list_city){

        if(err || !list_city)
        {
            console.log(err);
            return wcb("[find_cities]"+err,wdatas);
        }
        else
        {
            wdatas.list_city = list_city;
            return wcb(null,wdatas);
        }

    })

}