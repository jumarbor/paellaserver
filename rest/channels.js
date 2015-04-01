
var mongoose = require('mongoose');

var ChannelController = require(__dirname + '/../controllers/channels');
var CommonController = require(__dirname + '/../controllers/common');
var AuthController = require(__dirname + '/../controllers/auth');

exports.routes = {
	listChannels: { get:[
		CommonController.Paginate,
		ChannelController.LoadChannels,
		CommonController.JsonResponse] },

	getChannelData: { param:'id', get:[
		ChannelController.LoadChannel,
    	ChannelController.LoadUrlFromRepository,
		CommonController.JsonResponse]},

	createChannel: { post:[
		AuthController.CheckAccess(['ADMIN','USER']),
		function(req,res) {
			res.json({
				status:true,
				message:"Ok"
			})
		}]

		//function(req,res) {
		//var id = req.params.id
		//var fooResult = {}
    	//fooResult._id = 5;
    	//fooResult.title = data.title;
    	//fooResult.src = data.src;
    	//res.json(fooResult);
    	//}
	},
	updateChannel: { param:'id', put:function(req,res) {
		var id = req.params.id
		data._id = id;
		res.json(fooResult);
	}},

	updateChannelField: { param:'id', patch:function(req,res) {
		var id = req.params.id
		fooResult._id = id;
        fooResult.title = "Channel " + id;
        fooResult.src = "Channel_" + id + ".mp4";
        fooResult[data.field] = data.value;
        res.json(fooResult);
	}},

	deleteChannel: { param:'id', delete:function(req,res) {
		var id = req.params.id
		res.json({ status:true, message:"Channel deleted"});
	}}
}
