const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const axios = require('axios');

const youtubeStatistics = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id={$token$}&key=${process.env.YOUTUBEAPIKEY}`;
const youtubeSnippets = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id={$token$}&key=${process.env.YOUTUBEAPIKEY}`;

async function simplifyySubDetails(sub, idString) {
	let subDetails = [];
	for (const el of sub) {
		let views;
		let heading;
		let numberOfDays;
		const token = el.link.split('/')[3];
		const statsLink = youtubeStatistics.replace('{$token$}', token);
		const snipsLink = youtubeSnippets.replace('{$token$}', token);
		await axios.get(statsLink).then((response) => {
			views = response.data.items[0].statistics.viewCount;
		});
		await axios.get(snipsLink).then((response) => {
			heading = response.data.items[0].snippet.title;
			numberOfDays = (Date.now() - new Date(response.data.items[0].snippet.publishedAt));
			numberOfDays = numberOfDays / (1000 * 3600 * 24);
			numberOfDays = parseInt(numberOfDays)
		})
		const details = {
			link: `https://www.youtube.com/embed/${token}`,
			_id: el._id,
			id: `${idString}/${el._id}`,
			heading,
			views,
			numberOfDays
		}
		subDetails.push(details);
	};
	return subDetails;
}

module.exports = async function simplifyData(main, sub, idString) {
	const mainLink = `https://www.youtube.com/embed/${main.link.split('/')[3]}`;
	const subDetails = await simplifyySubDetails(sub, idString);
	const details = {
		mainLink,
		subDetails
	}
	return details;
}

