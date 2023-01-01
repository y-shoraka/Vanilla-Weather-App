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
function updateForecast(response) {
  console.log(response.data.daily);
  let forecastDay = response.data.daily;
  function day(forecastDay) {
    let date = new Date(forecastDay.time * 1000);
    let day = date.getDay();
    let weekDays = ["Sun", "Mon", "Tue", "wed", "Thur", "Fri", "Sat"];
    return weekDays[day];
  }

  // let days = ["Sun", "Mon", "Tue"];
  let weatherForecast = document.querySelector(".weather-forecast");
  let weatherFroecastHTML = "";
  forecastDay.forEach(function (forecastDay, index) {
    if (index < 5) {
      weatherFroecastHTML += `<div class="weatherColumn">
  <div class="date">${day(forecastDay)}</div>
  <div class="weather-icon"><img src="${
    forecastDay.condition.icon_url
  }" alt=""></div>
  <div class="weather-max-min"><span class="minTemp" >${Math.round(
    forecastDay.temperature.minimum
  )}° </span>   <span class="maxTemp">  ${Math.round(
        forecastDay.temperature.maximum
      )}°</span></div>
</div>`;
    }
  });
  weatherForecast.innerHTML = weatherFroecastHTML;
}

function displayForecast(city) {
  let ApiKey = "d622ab03edofbbtc80f362a442d6777c";
  let ApiUrls = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${ApiKey}&units=metric`;
  axios(ApiUrls).then(updateForecast);
}
function DisplayTemp(response) {
  console.log(response);
  displayForecast(response.data.city);
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
