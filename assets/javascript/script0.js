var apiKey = "a512e418425f3c7a04d5cd4d6d2072a6";
// var iconUrl = "http://openweathermap.org/img/w/01d.png"
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
    if (city) {
        // console.log('searching');
        // console.log(city);
        // cityName.textContent = city;
        document.getElementById('main').classList.remove("hide")
        // saveSearch(city);
        setOneDayData(city);
        setFiveDay(city);
        // testForcastTimes(city);
    }
    else {
        alert("Please enter a city.");
    }
});

loadSaved();

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

        var rawCity = data.name;
        var city = capitalize(rawCity);
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
        saveSearch(city);

        //TODO: TESTING
        testForcastTimes(cityLat, cityLon);

    })
    .catch(err => {
        alert("Please enter a valid city name.");
        console.log(err);
    })
}

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

function setFiveDay (city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log('forecast:');
        // console.log(data);
        // console.log(data.list.length);
        var elIdx = 2;

        //TODO: testing forecast time slots
        for (let i = 0; i < data.list.length; i++) {
            // console.log(data.list[i].dt_txt);
        }
        
        //TODO: check to see if starting index changes!!!
        for (let i=3; i < data.list.length; i+=8) {
            // console.log(data.list[i].dt_txt)
            var dateArr = data.list[i].dt_txt.split(" ");
            var dateArr2 = dateArr[0].split("-");
            var dateFormat = `(${dateArr2[1]}/${dateArr2[2]}/${dateArr2[0]})`
            // console.log(dateFormat)
            var dateEl = document.getElementById(`date-${elIdx}`);
            var iconEl = document.getElementById(`icon-${elIdx}`);
            var tempEl = document.getElementById(`temp-${elIdx}`);
            var windEl = document.getElementById(`wind-${elIdx}`);
            var humidityEl = document.getElementById(`humidity-${elIdx}`);

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
            elIdx++;
        }
    })
}

function saveSearch(city) {
    // console.log(`saving`);
    // var name = capitalize(city);
    var savedEl = document.getElementById('saved');
    var newBtn = document.createElement('button');
    newBtn.textContent = city;
    newBtn.setAttribute('id', `${city}-btn`);
    savedEl.appendChild(newBtn);

    newBtn.addEventListener("click", function(e) {
        e.preventDefault();
            setOneDayData(city);
            setFiveDay(city);
    });
    localStorage.setItem('city', `${city}`);//need unique key
}

function loadSaved() {
    // console.log(localStorage)
}

function capitalize(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
}

function testForcastTimes(lat, lon) {
    var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`;
    // var requestURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid={apiKey}&units=imperial`;
    // var requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log('forecast:');
        // console.log(lat);
        // console.log(lon);
        console.log(data);

       
        for (let i = 0; i < data.daily.length - 2; i++) {
            // console.log(data.daily[i].dt);
            
         let timestamp = new Date(data.daily[i].dt * 1000);
         let day = timestamp.getDate();
         let month = timestamp.getMonth() + 1;
         let year = timestamp.getFullYear();
        console.log(`${month}/${day}/${year}`);
        }
        // console.log(data.list.length);
    })
    
}