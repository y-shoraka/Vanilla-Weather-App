let Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Satuday"];
let date = new Date();
let CurrentDay = date.getDay();
document.querySelector("#day").innerHTML = Days[CurrentDay];
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
document.querySelector("#hour").innerHTML = hours + ":";
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
document.querySelector("#minute").innerHTML = date.getMinutes();
function convertToF() {
  let F = (celsius * 9) / 5 + 32;
  document.querySelector("#temp").innerHTML = Math.round(F);
}
function convertToC() {
  document.querySelector("#temp").innerHTML = Math.round(celsius);
}

document.querySelector("#F").addEventListener("click", convertToF);
document.querySelector("#C").addEventListener("click", convertToC);
function displayForecast(response) {
//console.log(response.data.daily)

}
function DisplayTemp(response) {
  let coordinates = response.data.coordinates;
  celsius = response.data.temperature.current;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity + "%";
  document.querySelector(
    "#wind"
  ).innerHTML = `  Wind: ${response.data.wind.speed}Km/hr`;
  document
    .querySelector("#img")
    .setAttribute("src", response.data.condition.icon_url);
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let ApiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let ApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`;
  axios(ApiKey).then(displayForecast);
  let days = ["Sun", "Mon", "Tue"];
  let weatherForecast = document.querySelector(".weather-forecast");
  let weatherFroecastHTML = "";
  days.forEach(function (days) {
    weatherFroecastHTML += `<div class="weatherColumn">
  <div class="date">${days}</div>
  <div class="weather-icon"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" alt=""></div>
  <div class="weather-max-min"><span class="maxTemp" > 18° </span>   <span class="minTemp">  12°</span></div>
</div>`;
  });
  weatherForecast.innerHTML = weatherFroecastHTML;
}

function search(city) {
  let key = "d622ab03edofbbtc80f362a442d6777c";

  let ApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

  axios.get(ApiUrl).then(DisplayTemp);
}

function submitHandler(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searchInput").value;

  search(searchedCity);
  document.querySelector(".cityName").innerHTML = searchedCity;
}
let celsius = null;
document.querySelector("#searchForm").addEventListener("submit", submitHandler);

search("tehran");
