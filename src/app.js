function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "SUN",
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(time) {
    let date = new Date(time * 1000);
    let day = date.getDay();
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElenment = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if(index < 6) {
        forecastHTML += `
        <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="Weather" width="36"/>
                <div class="weather-forecast-temp"><span.weather-forecast-temp-max>${Math.round(forecastDay.temperature.maximum)}° </span><span class="weather-forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}°</span></div>
        </div>
        `;
         }
    })

    forecastHTML += `</div>`;
    forecastElenment.innerHTML = forecastHTML;
}

function getForecast(city) {
    let apiKey = "f17boc23c2b2f34d1ab3d2t904991752";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", response.data.condition.icon_url);
    iconElement.setAttribute("alt", response.data.condition.description);

    celsiusTemp = response.data.temperature.current;

    getForecast(response.data.city);
}

function displayFarenhiteTemp(event) {
    event.preventDefault();
    let farenhiteTemp = (celsiusTemp * 9)/5 + 32;
    let temperatureElem = document.querySelector("#temp");
    temperatureElem.innerHTML = Math.round(farenhiteTemp);
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElem = document.querySelector("#temp");
    temperatureElem.innerHTML = Math.round(celsiusTemp);
}

function search(city) {
    let apiKey = "f17boc23c2b2f34d1ab3d2t904991752";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenhite = document.querySelector("#farenhite");
farenhite.addEventListener("click", displayFarenhiteTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp)