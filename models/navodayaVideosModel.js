const mongoose = require('mongoose');

const navodayaVideosSchema = new mongoose.Schema({
	link: {
		type: String,
		required: [true, 'Navodaya Videos Schema requires a link'],
	}
});


const numerologyVideosSchema = new mongoose.Schema({
	link: {
		type: String,
		required: [true, 'Numerology Videos Schema requires a link'],
	}
});
const horoscopyVideosSchema = new mongoose.Schema({
	link: {
		type: String,
		required: [true, 'Horoscopy Videos Schema requires a link'],
	}
});
const othersVideosSchema = new mongoose.Schema({
	link: {
		type: String,
		required: [true, 'Others Videos Schema requires a link'],
	}
});


const NavodayaVideos = mongoose.model('NavodayaVideos', navodayaVideosSchema);
const NumerologyVideos = mongoose.model('NumerologyVideos', numerologyVideosSchema);
const HoroscopyVideos = mongoose.model('HoroscopyVideos', horoscopyVideosSchema);
const OthersVideos = mongoose.model('OthersVideos', othersVideosSchema);

module.exports = {
	NumerologyVideos,
	HoroscopyVideos,
	OthersVideos,
	NavodayaVideos,
}