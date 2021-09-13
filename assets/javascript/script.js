var apiKey = "a512e418425f3c7a04d5cd4d6d2072a6";
var iconUrl = "http://openweathermap.org/img/w/01d.png"
var searchBtn = document.getElementById('searchBtn');
var cityInput = document.getElementById('searched-city');
var date = moment().format('l'); 



//==============================================================================
//TODO:: change uv index back to fetch in setUvIdx() before deploying!!!!  =====
//==============================================================================


searchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    // var cityName = document.getElementById('city');
    var city = cityInput.value;
    console.log('searching');
    console.log(city);
    // cityName.textContent = city;
    document.getElementById('main').classList.remove("hide")
    saveSearch(city);
    setOneDayData(city);
    setFiveDay(city);
});


function setOneDayData(city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;
        // console.log(cityLat);
        // console.log(cityLon);
        
        var nameEl = document.getElementById('city');
        var iconEl = document.getElementById('icon');
        var tempEl = document.getElementById(`oneday-temp`);
        var windEl = document.getElementById(`oneday-wind`);
        var humidityEl = document.getElementById(`oneday-humidity`);
        var uvTitleEl = document.getElementById(`uv-title`);

        var city = data.name;
        // var date = moment().format('l'); 
        var icon = data.weather[0].icon;
        // console.log(icon)
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

        // console.log(data.value);
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

function setFiveDay (city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // console.log(data.list.length);
        var idx = 2;
        
        //TODO: check to see if starting index changes!!!
        for (let i=3; i < data.list.length; i+=8) {
            // console.log(data.list[i].dt_txt)
            var dateArr = data.list[i].dt_txt.split(" ");
            var dateArr2 = dateArr[0].split("-");
            var dateFormat = `(${dateArr2[1]}/${dateArr2[2]}/${dateArr2[0]})`
            // console.log(dateFormat)
            var dateEl = document.getElementById(`date-${idx}`);
            var iconEl = document.getElementById(`icon-${idx}`);
            var tempEl = document.getElementById(`temp-${idx}`);
            var windEl = document.getElementById(`wind-${idx}`);
            var humidityEl = document.getElementById(`humidity-${idx}`);

            var icon = data.list[i].weather[0].icon;
            var temp = data.list[i].main.temp;
            var wind = data.list[i].wind.speed;
            var humidity = data.list[i].main.humidity;

            var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
            
            iconEl.setAttribute(`src`, `${iconUrl}`);
            dateEl.innerHTML = dateFormat;
            tempEl.innerHTML = `Temp: ${temp}&degF`;
            windEl.innerHTML = `Wind: ${wind} MPH`;
            humidityEl.innerHTML = `Humidity ${humidity}%`;
            idx++;
        }
        // var time1 = new Date(data.list[0].dt);
        // console.log(time1.getDate())
        // var time2 =data.list[5].dt;
        // var isEqual = moment(time1).isSame(time2, 'day') //working retuns true
        // console.log(isEqual)
        // var cityLat = data.coord.lat;
        // var cityLon = data.coord.lon;
        // console.log(cityLat);
        // console.log(cityLon);
        
        // var nameEl = document.getElementById('city');
        // var iconEl = document.getElementById('icon');
        // var tempEl = document.getElementById(`oneday-temp`);
        // var windEl = document.getElementById(`oneday-wind`);
        // var humidityEl = document.getElementById(`oneday-humidity`);
        // var uvTitleEl = document.getElementById(`uv-title`);

        // var city = data.name;
        // var date = moment().format('l'); 
        // var icon = data.weather[0].icon;
        // console.log(icon)
        // var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
        // var temp = data.main.temp;
        // var wind = data.wind.speed;
        // var humidity = data.main.humidity;
        
        // console.log(temp)
        // nameEl.innerHTML = `${city} (${date}) `;
        // iconEl.setAttribute(`src`, `${iconUrl}`);
        // tempEl.innerHTML = `Temp: ${temp}&degF`;
        // windEl.innerHTML = `Wind: ${wind} MPH`;
        // humidityEl.innerHTML = `Humidity: ${humidity} %`;
        // uvTitleEl.innerHTML = `UV Index: `
        // setUvIdx(cityLat, cityLon);
        
        // setOneDay(0,data.main.temp)
    })
}

function saveSearch(city) {

}