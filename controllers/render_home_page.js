var async       =require('async');
var request     =require('request');
var User        = require("../shared_models/User");
var fs          = require("file-system");

module.exports = function (req, res, next) {


async.waterfall([

        function (wcb) {

            var wdatas= {

                file_name : req.query.file_name || "test.csv",

            };

            return wcb(null,wdatas);
        },

        read_file,

    ],
    function(error,result){

        if(error || !result){

            console.log(error);
            console.log("[Controllers][render_home_page]"+error)
            return res.render (" error.ejs", {});

        }else{

            return res.render ("home.ejs", {});

        }

    });
};



var read_file = function(wdatas, wcb)
{

    var file_name = wdatas.file_name;

    fs.readFile('/etc/passwd', (err, data) => {
      if (err)
      {
        console.log(err);
        return wcb("[read_file]"+err);

      }
      else
      {

        console.log("data : ");
        console.log(data);
        
        return wcb(null, wdatas);

      }
    });

}