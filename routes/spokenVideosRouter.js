const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/videosController');

router
	.route('/')
	.post(VideoController.createSpokenVideo)
	.get(VideoController.getSpokenVideos);

module.exports = router;