function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class=row>`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
                  <div class="WeatherForecastPreview">
                    <div class="forecast-time">${forecastDay.time}</div>
                    <img
          src="	https://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" alt="" width="42"/>
                    <div class="forecast-temperature">
                      <span class="forecast-temperature-max">19°</span
                      ><span class="forecast-temperature-min">16°</span>
                    </div>
                  </div>
                </div>
                `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(city) {
  let apiKey = "370f6ctbab902413o43b492fe5060b44";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data.daily);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weathericon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute =
    ("src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  iconElement.setAttribute = ("alt", response.data.condition.description);

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "370f6ctbab902413o43b492fe5060b44";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let displayFahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(displayFahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let displayCelsiusTemperature = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = Math.round(displayCelsiusTemperature);
}

search("Munich");

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#link-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#link-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let dailyTemperature;
