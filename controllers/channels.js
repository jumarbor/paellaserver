var mongoose = require('mongoose');

// Load video title and identifier list
//	Input: req.query.skip, req.query.limit
//	Output: res.data [ { _id:"video_id", title:"video_title" } ]
exports.LoadChannels = function(req,res,next) {
	var Channel = require(__dirname + '/../models/channel');
	var select = '-children -creationDate -deletionDate ' +
				'-hidden -hiddenInSearches -owned -pluginData -repository ' +
				'-videos';
	Channel.find()
		.skip(req.query.skip)
		.limit(req.query.limit)
		.select(select)
		.exec(function(err,data) {
			req.data = data;
			next();
		});
}

exports.LoadChannel = function(req,res,next) {
	var Channel = require(__dirname + '/../models/channel');
	//var select = '-search -processSlides';
	Channel.find({ "_id":req.params.id})
		//.select(select)
		.exec(function(err,data) {
			req.data = data;
			next();
		});
}

exports.LoadUrlFromRepository = function(req,res,next) {
	var Repository = require(__dirname + '/../models/repository');
	if (req.data && req.data.length>0 && req.data[0].source && req.data[0].source.videos) {
		var videoData = req.data[0];
		Repository.find({"_id":videoData.repository})
			.exec(function(err,repo) {
				if (repo.length>0) {
					repo = repo[0];
				}
				else {
					repo = { server:'', endpoint:'' };
				}
				videoData.source.videos.forEach(function(video) {
					if (video.src) {
						video.src = repo.server + repo.endpoint + videoData._id + '/polimedia/' + video.src;
					}
				});
				if (videoData.thumbnail) videoData.thumbnail = repo.server + repo.endpoint + videoData._id + '/' + videoData.thumbnail;
				videoData.slides.forEach(function(slide) {
					if (slide.url) slide.url = repo.server + repo.endpoint + videoData._id + '/' + slide.url;
					if (slide.thumb) slide.thumb = repo.server + repo.endpoint + videoData._id + '/' + slide.thumb;
				});

				req.data = videoData;
				next();
			});
	}
	else {
		next();
	}
}