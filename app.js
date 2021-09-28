"use strict";
const api = {
  key: 'dcf9095cf86b007950e493fc90867f5a',
  baseurl: 'https://api.openweathermap.org/data/2.5/',
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery)
function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchBox.value)
    console.log(searchBox.value)
  }
};


function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.city');
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.date');

  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;
  let weatherE1 = document.querySelector('.weather');
  weatherE1.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${weather.main.temp_min} °C / ${weather.main.temp_max}°C`
}
function dateBuilder(m) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jule",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Thusday",
    "Friday",
    "Saturday"
  ];
  let day = days[m.getDay()];
  let date = m.getDate()
  let month = months[m.getMonth()];
  let year = m.getFullYear();

  return `${day} ${date} ${month} ${year}`
}