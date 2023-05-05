const mongoose = require('mongoose');

const spokenVideosSchema = new mongoose.Schema({
	link: {
		type: String,
		required: [true, 'Spoken Videos Schema requires a link']
	}
});


const SpokenVideos = mongoose.model('SpokenVideos', spokenVideosSchema);

module.exports = SpokenVideos;