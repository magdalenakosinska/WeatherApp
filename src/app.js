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

function search(city) {
  let key = "td503e163f854a0f6995cof25bd51a89";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${key}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

// adding "searching..." text and search functionality

function handleSubmit(event) {
  event.preventDefault();
  let searchText = document.querySelector("#search-text");
  let cityInputElement = document.querySelector("#form-search");
  search(cityInputElement.value);
  searchText.innerHTML = `Searching for ${cityInputElement.value}...`;
}

let searchCityForm = document.querySelector("#searchCityForm");

searchCityForm.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let temperatureElement = document.querySelector("#temperature-today");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

search("Oslo");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">
          Tomorrow
          <div class="weather-forecast-icon">
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
              alt="weather icon"
              width="42"
            />
          </div>
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-maximum">20°C</span>
            <span class="weather-forecast-temperature-minimum">2°C</span>
          </div>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastHTML = forecastElement.innerHTML = forecastHTML;
}

// changing C to K and vice versa

// (X * 9) / 5 + 32);

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature-today");
  tempCelsiusLink.classList.remove("active");
  tempFahrenheitLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(tempFahrenheit);
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-today");
  tempCelsiusLink.classList.add("active");
  tempFahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let tempFahrenheitLink = document.querySelector("#temperature-fahrenheit");
tempFahrenheitLink.addEventListener("click", changeToFahrenheit);

let tempCelsiusLink = document.querySelector("#temperature-celsius");

tempCelsiusLink.addEventListener("click", changeToCelsius);
