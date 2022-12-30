let now = new Date();

let day = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes >= 0 && minutes <= 9) {
  minutes = "0" + minutes;
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = document.querySelector("#currentTime");

currentTime.innerHTML = `${weekDays[day]} ${hours}:${minutes}`;

// adding "searching..." text

function addSearchText(event) {
  event.preventDefault();
  let searchText = document.querySelector("#search-text");
  let cityValue = document.querySelector("#form-search");
  searchText.innerHTML = `Searching for ${cityValue.value}...`;
}

let searchCityForm = document.querySelector("#searchCityForm");

searchCityForm.addEventListener("submit", addSearchText);

// changing C to K and vice versa

// (X * 9) / 5 + 32);

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML = (temperatureToday * 9) / 5 + 32;
  console.log(typeof temperatureToday);
}

let tempFahrenheit = document.querySelector("#temperature-fahrenheit");
tempFahrenheit.addEventListener("click", changeToFahrenheit);

let tempCelcius = document.querySelector("#temperature-celcius");

let key = "td503e163f854a0f6995cof25bd51a89";
let query = "Lisbon";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=metric`;

/*function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = `${temperature}`;
}
axios.get(apiURL).then(showTemperature); */
