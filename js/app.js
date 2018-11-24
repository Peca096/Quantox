document.addEventListener('DOMContentLoaded', displayData);
const weatherParent = document.getElementById('weather-container');
const weatherDetails = document.querySelector('weather-details');

const weatherData = {
	tempUnit: 'C',
	windSpeedUnit: 'm/s',
	days: [
		{
			day: 'Mon',
			temp: 22,
			windDirection: 'north-east',
			windSpeed: 10,
			type: 'sunny'
		},
		{
			day: 'Tue',
			temp: 14,
			windDirection: 'north-west',
			windSpeed: 14,
			type: 'rainy'
		},
		{
			day: 'Wed',
			temp: 17,
			windDirection: 'south-east',
			windSpeed: 20,
			type: 'cloudy'
		},
		{
			day: 'Thu',
			temp: 17,
			windDirection: 'south-east',
			windSpeed: 20,
			type: 'cloudy'
		},
		{
			day: 'Fri',
			temp: 22,
			windDirection: 'north-east',
			windSpeed: 10,
			type: 'sunny'
		},
		{
			day: 'Sat',
			temp: 17,
			windDirection: 'south-east',
			windSpeed: 20,
			type: 'misty'
		},
		{
			day: 'Sun',
			temp: 17,
			windDirection: 'south-east',
			windSpeed: 20,
			type: 'rainy'
		}
	]
};

//  filter functions
document.getElementById('tempFilter').addEventListener('click', e => {
	weatherParent.innerHTML = '';
	if (e.target.textContent === 'C') {
		weatherData.tempUnit = e.target.textContent;
		e.target.textContent = 'K';
		displayData();
	} else {
		weatherData.tempUnit = e.target.textContent;
		e.target.textContent = 'C';
		displayData();
	}
});
document.getElementById('speedFilter').addEventListener('click', e => {
	weatherParent.innerHTML = '';
	if (e.target.textContent === 'm/s') {
		weatherData.windSpeedUnit = e.target.textContent;
		e.target.textContent = 'km/h';
		displayData();
	} else {
		weatherData.windSpeedUnit = e.target.textContent;
		e.target.textContent = 'm/s';
		displayData();
	}
});

//display data on screen
function displayData() {
	const { days } = weatherData;

	// loop through each item in array
	days.forEach(day => {
		const weatherItem = document.createElement('a');
		weatherItem.className = `weatherItem ${day.type}`;
		const title = document.createElement('h3');
		title.textContent = `${day.day} ${calculateTemp(day.temp)}`;
		weatherItem.appendChild(title);

		const details = document.createElement('div');
		details.className = 'weather-details';

		const windDirection = document.createElement('p');
		windDirection.innerHTML = `Wind Direction: <span class="arrow arrow-${
			day.windDirection
		}"></span>  (${day.windDirection})`;
		details.appendChild(windDirection);

		const windSpeed = document.createElement('p');
		windSpeed.innerHTML = `Wind Speed: <span class="value"> ${calculateWind(
			day.windSpeed
		)} </span>`;
		details.appendChild(windSpeed);

		const type = document.createElement('p');
		type.textContent = `${day.type}`;
		details.appendChild(type);

		weatherItem.appendChild(details);

		weatherItem.addEventListener('click', () => {
			details.classList.toggle('visible');
		});

		weatherParent.appendChild(weatherItem);
	});
}
// helper functions
function calculateTemp(data) {
	const { tempUnit } = weatherData;
	return tempUnit === 'K'
		? `${data + 273.15} ${tempUnit} `
		: `${data} ${tempUnit} `;
}
function calculateWind(data) {
	const { windSpeedUnit } = weatherData;
	return windSpeedUnit === 'km/h'
		? `${data / 1000} ${windSpeedUnit} `
		: `${data} ${windSpeedUnit}`;
}
