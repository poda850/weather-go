//input
let searchInput = document.getElementById("searchInput");
//HTML Elements
let day1 = {
  name: document.getElementById("day1Name"),
  date: document.getElementById("day1Date"),
  country: document.getElementById("countryName"),
  conditionImg: document.getElementById("conditionImg"),
  temp: document.getElementById("day1Temp"),
  condition: document.getElementById("day1Condition"),
  cloudCover: document.getElementById("cloudCover"),
  windSpeed: document.getElementById("windSpeed"),
  windDirection: document.getElementById("windDirection"),
}
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");


searchInput.addEventListener("blur", function () {
  getData(searchInput.value);
})


async function getData(countryName) {
  let apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6d789464a7f9413c939135237230408&q=${countryName}&days=3&aqi=no&alerts=no`);
  let FinalJson = await apiResponse.json();
  console.log(FinalJson)
  document.getElementById("row").innerHTML = `
  <div class="col-md-3 bg-dark text-light rounded-3 p-4 m-3" id="day1">
    <div class="d-flex justify-content-between mb-4">
        <span id="day1Name">${new Date(FinalJson.current.last_updated).toLocaleString('en-us', { weekday: 'long' })}</span>
        <span id="day1Date">${new Date(FinalJson.current.last_updated).toLocaleString('en-us', { month: 'long', day: 'numeric' })}</span>
    </div>
    <div class="mb-3 text-center my-4">
        <span id="countryName">${FinalJson.location.name}</span>
        <div class="d-flex justify-content-around align-items-center">
            <h1 class="fs-1 fw-bold" id="day1Temp">${FinalJson.current.temp_c + `&#176;C`}</h1>
            <img id="conditionImg" class="w-25" src="${FinalJson.current.condition.icon}"></img>
        </div>
        <span id="day1Condition" class="text-primary">${FinalJson.current.condition.text}</span>
    </div>
    <div class="d-flex justify-content-evenly mt-5">
        <div>
            <i class="fa-solid fa-cloud text-secondary fs-5"></i>
            <span id="cloudCover">${FinalJson.current.cloud + ` %`}</span>
        </div>
        <div>
            <i class="fa-solid fa-wind text-secondary fs-5"></i>
            <span id="windSpeed">${FinalJson.current.wind_kph + ` km/h`}</span>
        </div>
        <div>
            <i class="fa-regular fa-compass text-secondary fs-5"></i>
            <span id="windDirection">${FinalJson.current.wind_dir}</span>
        </div>
    </div>
</div>
`
  let divs = ""
  for (i = 1; i < FinalJson.forecast.forecastday.length; i++) {
    divs += `
      <div class="col-md-3 bg-dark text-light rounded-3 p-4 d-flex flex-column align-items-center justify-content-evenly m-3" id="day2">
      <div>${new Date(FinalJson.forecast.forecastday[i].date).toLocaleString('en-us', { weekday: 'long' })}</div>
      <img src="${FinalJson.forecast.forecastday[i].day.condition.icon}" alt="" class="w-25">
      <div>
          <div class="fs-2">${FinalJson.forecast.forecastday[i].day.maxtemp_c + `&#176;C`}</div>
          <div class="text-secondary">${FinalJson.forecast.forecastday[i].day.mintemp_c + `&#176;C`}</div>
      </div>
      <div class="text-primary m-4">${FinalJson.forecast.forecastday[i].day.condition.text}</div>
      </div>
      `
  }
  document.getElementById("row").innerHTML += divs

  



}

getData("cairo")