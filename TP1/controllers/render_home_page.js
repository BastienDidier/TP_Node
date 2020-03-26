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
        save_users,

    ],
    function(error,result){

        if(error || !result){

            console.log(error);
            console.log("[Controllers][render_home_page]"+error)
            return res.render (" error.ejs", {});

        }else{

            return res.render ("home.ejs", {

                users :         result.tab_user,
                file_name :     result.file_name
            });

        }

    });
};



var read_file = function(wdatas, wcb)
{

    var file_name = wdatas.file_name;

    fs.readFile(file_name,"utf-8", function(err, data) {
      if (err)
      {
        console.log(err);
        return wcb("[read_file]"+err);

      }
      else
      {

        console.log("data : ");
        console.log(data);
        let tab_data = data.split("\n");
        console.log(tab_data);
        let tab_user = [];
        for(var i = 0 ; i < tab_data.length -1 ; i++)
        {

            let user = {
                nom :  tab_data[i].split(";")[0],
                ville: tab_data[i].split(";")[1]
            };
            tab_user.push(user);
        }

        wdatas.tab_user = tab_user;
        return wcb(null, wdatas);

      }
    });
}


var save_users = function(wdatas , wcb)
{

    var tab_user = wdatas.tab_user;


   async.eachOfLimit(tab_user, 1, function(user, index, ecb){
    
        let model_user = new User(user);
        model_user.save(function(err,user_saved)
        {

            if(err || ! user_saved)
            {
                console.log(err);
                return ecb(err);
            }
            else
            {
                return ecb(null);
            }

        })

    }, function(err){
        
        if(err)
        {
            console.log(err);
            return wcb("[save_users][eachoflimit]"+err, wdatas);
        }
        else
        {
            return wcb(null,wdatas);
        }
    });


}
