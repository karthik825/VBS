const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/videosController');

router
	.route('/')
	.post(VideoController.createNavodayaVideo)
	.get(VideoController.getNavodayaVideos);

module.exports = router;