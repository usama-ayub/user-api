var express = require('express'),
    router = express.Router(),
    api = require('../controller/index');


/**
 * API routes.
 */
//register user and return msg
router.post('/register', api.register);
//login user and return userId and msg
router.post('/login', api.login);
//login token verify
router.post('/login', api.tokenVerify);
//get all users
router.get('/users', api.getUsers);
//user middleware

router.param('userId', api.param);
//get unique user
router.get('/users/:userId',api.getUsersbyID);
// update user
router.put('/users/:userId',api.authorize, api.updateUser);
//delete user
router.delete('/users/:userId',api.authorize, api.delUser);
//password reset
/*router.post('users/:userId', api.passwordReset);*/

/**
 * API for wrong request.
 */

router.all('*',function(req,res){
    res.status(400).json({msg:'invalid api'})
});


module.exports = router;



/*

 // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
 router.use(function (req, res, next) {
 console.log('Something is happening.');
 next(); // make sure we go to the next routes and don't stop here
 });

 // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
 router.get('/', function (req, res) {
 res.json({message: 'hooray! welcome to our api!'});
 });

 // more routes for our API will happen here

 // REGISTER OUR ROUTES -------------------------------
 // all of our routes will be prefixed with /api
 router.route('/bears')
 .post(function (req, res) {

 var bear = new Bear();      // create a new instance of the Bear model
 bear.name = req.body.name;
 bear.serialNo = req.body.serialNo;// set the bears name (comes from the request)

 bear.save(function (err) {
 if (err)
 res.send(err);

 res.json({message: 'Bear created!'});
 });

 })
 .get(function (req, res) {
 Bear.find(function (err, bears) {
 if (err)
 res.send(err);
 res.json(bears);
 });
 });
 router.route('/bears/:bear_id')
 .get(function (req, res) {
 Bear.findById(req.params.bear_id, function (err, bear) {
 if (err)
 res.send(err);
 res.json(bear);
 });
 })

 .put(function (req, res) {
 Bear.findById(req.params.bear_id, function (err, bear) {

 if (err)
 res.send({meg: "not found", err: err});

 bear.name = req.body.name;  // update the bears info
 bear.serialNo = req.body.serialNo;
 // save the bear
 bear.save(function (err) {
 if (err)
 res.send(err);

 res.json({message: 'Bear updated!'});
 });

 });
 })
 .delete(function (req, res) {
 Bear.remove({
 _id: req.params.bear_id
 }, function (err, bear) {
 if (err)
 res.send(err);

 res.json({message: 'Successfully deleted'});
 });
 });
 */