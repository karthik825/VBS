const SpokenVideos = require('../models/spokenVideosModel');
const { NavodayaVideos, HoroscopyVideos, NumerologyVideos, OthersVideos } = require('../models/navodayaVideosModel');
const catchAsync = require('../utils/catchAsync');
const simplifyData = require('../utils/simplifyData');
exports.getSpoken = catchAsync(async (req, res) => {
	let data = await SpokenVideos.find();
	data.reverse();
	let [main, ...sub] = data;
	if (data.length !== 0) {
		data = await simplifyData(main, sub, 'spoken');
	}
	res.status(200).render('youVBS', {
		title: "VBS",
		subtitle: "Spoken English",
		data: data
	});
});

exports.getCertainVideoSpoken = catchAsync(async (req, res) => {
	const main = await SpokenVideos.findById(req.params.id);
	const sub = await SpokenVideos.find();
	sub.reverse();
	const data = await simplifyData(main, sub, 'spoken');
	res.status(200).render('_youVBS', {
		title: "VBS",
		subtitle: "Spoken English",
		data: data
	});
});

exports.getNavodaya = catchAsync(async (req, res) => {
	let data = await NavodayaVideos.find();
	data.reverse();
	let [main, ...sub] = data;
	if (data.length !== 0) {
		data = await simplifyData(main, sub, 'navodaya');
	}
	res.status(200).render('nopopyouVBS', {
		title: "VBS",
		subtitle: "Navodaya",
		data: data
	});
});

exports.getCertainVideoNavodaya = catchAsync(async (req, res) => {
	const main = await NavodayaVideos.findById(req.params.id);
	const sub = await NavodayaVideos.find();
	sub.reverse();
	const data = await simplifyData(main, sub, 'navodaya');
	res.status(200).render('_youVBS', {
		title: "VBS",
		subtitle: "Navodaya",
		data: data
	});
})

exports.getNumerology = catchAsync(async (req, res) => {
	let data = await NumerologyVideos.find();
	data.reverse();
	let [main, ...sub] = data;
	if (data.length !== 0) {
		data = await simplifyData(main, sub, 'numerology');
	}
	res.status(200).render('nopopyouVBS', {
		title: "VBS",
		subtitle: "Numerology",
		data: data
	});
});

exports.getCertainVideoNumerology = catchAsync(async (req, res) => {
	const main = await NumerologyVideos.findById(req.params.id);
	const sub = await NumerologyVideos.find();
	sub.reverse();
	const data = await simplifyData(main, sub, 'numerology');
	res.status(200).render('_youVBS', {
		title: "VBS",
		subtitle: "Numerology",
		data: data
	});
});
exports.getHoroscopy = catchAsync(async (req, res) => {
	let data = await HoroscopyVideos.find();
	data.reverse();
	let [main, ...sub] = data;
	if (data.length !== 0) {
		data = await simplifyData(main, sub, 'horoscopy');
	}
	res.status(200).render('nopopyouVBS', {
		title: "VBS",
		subtitle: "Horoscopy",
		data: data
	});
});

exports.getCertainVideoHoroscopy = catchAsync(async (req, res) => {
	const main = await HoroscopyVideos.findById(req.params.id);
	const sub = await HoroscopyVideos.find();
	sub.reverse();
	const data = await simplifyData(main, sub, 'horoscopy');
	res.status(200).render('_youVBS', {
		title: "VBS",
		subtitle: "Horoscopy",
		data: data
	});
})
exports.getOthers = catchAsync(async (req, res) => {
	let data = await OthersVideos.find();
	data.reverse();
	let [main, ...sub] = data;
	if (data.length !== 0) {
		data = await simplifyData(main, sub, 'others');
	}
	res.status(200).render('nopopyouVBS', {
		title: "VBS",
		subtitle: "Others",
		data: data
	});
});

exports.getCertainVideoOthers = catchAsync(async (req, res) => {
	const main = await OthersVideos.findById(req.params.id);
	const sub = await OthersVideos.find();
	sub.reverse();
	const data = await simplifyData(main, sub, 'others');
	res.status(200).render('_youVBS', {
		title: "VBS",
		subtitle: "Others",
		data: data
	});
});