module.exports = function (router) {
    router.get("/render",   require("../controllers/rendercity")); 
    router.get("/cities", 	require("../controllers/get_cities"));
    router.post("/city", 	require("../controllers/post_cities"));
    router.put("/city/:id", require("../controllers/put_cities"));
    router.delete("/city/:id", require("../controllers/delete_cities"));
   
    router.post("*", function (req, res, next) {

        return res.status(200).json({error: true});
    });
    router.get("*", function (req, res, next) {

        return res.status(500).json({error: true});
    });

    return router;
};