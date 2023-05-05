const SpokenVideos = require('../models/spokenVideosModel');
const NavodayaVideos = require('../models/navodayaVideosModel')
const catchAsync = require('../utils/catchAsync');


//SPOKEN ENGISH API
exports.createSpokenVideo = catchAsync(async (req, res, next) => {
	const newVideo = await SpokenVideos.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			videoDetails: newVideo
		}
	});
});

exports.getSpokenVideos = catchAsync(async (req, res, next) => {
	const videos = await SpokenVideos.find();
	res.status(200).json({
		status: 'success',
		data: {
			videos
		}
	});
});


//NAVODAYA ENGLISH API
exports.createNavodayaVideo = catchAsync(async (req, res, next) => {
	const newVideo = await NavodayaVideos.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			videoDetails: newVideo
		}
	});
})

exports.getNavodayaVideos = catchAsync(async (req, res, next) => {
	const videos = await NavodayaVideos.find();
	res.status(200).json({
		status: 'success',
		data: {
			videos
		}
	});
});