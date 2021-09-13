var apiKey = "a512e418425f3c7a04d5cd4d6d2072a6";
var iconUrl = "http://openweathermap.org/img/w/01d.png"
var searchBtn = document.getElementById('searchBtn');
var cityInput = document.getElementById('searched-city');


searchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    // var cityName = document.getElementById('city');
    var city = cityInput.value;
    console.log('searching');
    console.log(city);
    // cityName.textContent = city;
    getOneDayData(city);
});

function getOneDayData(city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;
        console.log(cityLat);
        console.log(cityLon);
        
        var nameEl = document.getElementById('city');
        var iconEl = document.getElementById('icon');
        var tempEl = document.getElementById(`oneday-temp`);
        var windEl = document.getElementById(`oneday-wind`);
        var humidityEl = document.getElementById(`oneday-humidity`);
        var uvTitleEl = document.getElementById(`uv-title`);

        var city = data.name;
        var date = moment().format('l'); 
        var icon = data.weather[0].icon;
        console.log(icon)
        var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
        var temp = data.main.temp;
        var wind = data.wind.speed;
        var humidity = data.main.humidity;
        
        // console.log(temp)
        nameEl.innerHTML = `${city} (${date}) `;
        iconEl.setAttribute(`src`, `${iconUrl}`);
        tempEl.innerHTML = `Temp: ${temp}&degF`;
        windEl.innerHTML = `Wind: ${wind} MPH`;
        humidityEl.innerHTML = `Humidity: ${humidity} %`;
        uvTitleEl.innerHTML = `UV Index: `
        setUvIdx(cityLat, cityLon);
        
        // setOneDay(0,data.main.temp)
    })
}

// function setOneDay (icon, temp, wind, humidity, uvIdx) {
//     var tempEl = document.getElementById(`oneday-temp`);

//     tempEl.textContent = `Temp: ${temp}`;
// }

function setUvIdx (lat, lon) {
    var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(uvUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // var uvIdx = data.value;
        var uvIdx = 2;

        console.log(data.value);
        var uvIdxEl = document.getElementById(`oneday-uvIdx`);
        uvIdxEl.innerHTML = uvIdx;
        if (uvIdx < 3) {
            uvIdxEl.style.backgroundColor = "green";
        }
        else if (uvIdx >= 3 && uvIdx < 6) {
            uvIdxEl.style.backgroundColor = "yellow";
        }
        else {
            uvIdxEl.style.backgroundColor = "red";
        }
    })

}