let Days = [ "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Friday","Satuday"  ]
let date = new Date(); 
let CurrentDay = date.getDay() ;
document.querySelector("#day").innerHTML = Days[CurrentDay] ;
let hours = date.getHours();
if (hours < 10){
    hours = `0${hours}`
}
document.querySelector("#hour").innerHTML = hours+":" ;
 let minutes =  date.getMinutes();
 if (minutes <10 ){
    minutes = `0${minutes}`
 }
document.querySelector("#minute").innerHTML = date.getMinutes();

function DisplayTemp(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML = response.data.condition.description;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity+"%";
  document.querySelector("#wind").innerHTML = `  Wind: ${response.data.wind.speed}Km/hr` ; 
  

}

let key = "d622ab03edofbbtc80f362a442d6777c";
let city = "tehran";
let ApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

axios.get(ApiUrl).then(DisplayTemp);
