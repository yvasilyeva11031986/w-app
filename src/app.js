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


function displayTemp(response) {
    console.log(response.data);
    //console.log(response.data.temperature.current);
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
}

let apiKey = "f17boc23c2b2f34d1ab3d2t904991752";
let city = "Tokyo";

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);