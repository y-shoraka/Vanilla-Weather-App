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
  minutes ="0"+ minutes;
}
document.querySelector("#minute").innerHTML = date.getMinutes();
function convertToF(){
    let F = (celsius * 9/5) + 32 ;
    document.querySelector("#temp").innerHTML = Math.round(F);

}
function convertToC(){
    
    document.querySelector("#temp").innerHTML =Math.round(celsius)  ; 
}

document.querySelector("#F").addEventListener("click" , convertToF);
document.querySelector("#C").addEventListener("click" , convertToC);

function DisplayTemp(response) {
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
  console.log(response);
}

function search(city) {
  let key = "d622ab03edofbbtc80f362a442d6777c";

  let ApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

  axios.get(ApiUrl).then(DisplayTemp);
}

function submitHandler() {
  let searchedCity = document.querySelector("#searchInput").value;
  document.querySelector(".cityName").innerHTML = searchedCity ; 
  search(searchedCity);
}
let celsius = null ; 
document.querySelector("#submit").addEventListener("click", submitHandler);


let input = document.getElementById("#searchInput");
input.addEventListener("submit",submitHandler);