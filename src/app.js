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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function search(city) {
  let key = "td503e163f854a0f6995cof25bd51a89";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${key}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showForecast(city) {
  let key = "td503e163f854a0f6995cof25bd51a89";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
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
  showForecast(response.data.city);
}

search("Oslo");

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">
          ${formatDay(forecastDay.time)}
          <div class="weather-forecast-icon">
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png"
              alt="weather icon"
              width="42"
            />
          </div>
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-maximum">${Math.round(
              forecastDay.temperature.maximum
            )}??</span>
            <span class="weather-forecast-temperature-minimum">${Math.round(
              forecastDay.temperature.minimum
            )}??</span>
          </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastHTML = forecastElement.innerHTML = forecastHTML;
}
