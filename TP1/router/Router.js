module.exports = function (router) {

    router.get("/home" ,  require('../controllers/render_home_page'));
    router.get("/test", function (req, res, next) {
        console.log("Hello World");
        return res.status(200).json({error: true});
    });
    router.get("/", function (req, res, next) {
        console.log("Hello World");
        return res.send("hello world");
    });
    
    router.post("*", function (req, res, next) {

        return res.status(500).json({error: true});
    });
    router.get("*", function (req, res, next) {

        return res.status(500).json({error: true});
    });
    return router;
};