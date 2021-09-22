var apiKey = "a512e418425f3c7a04d5cd4d6d2072a6";
// var iconUrl = "http://openweathermap.org/img/w/01d.png"
var searchBtn = document.getElementById("searchBtn");
var searchForm = document.getElementById("searched-city");
var date = moment().format("l");
var cityLat;
var cityLon;
var capitalizedCityName;

//==============================================================================
//TODO:: change uv index back to fetch in setUvIdx() before deploying!!!!  =====
//==============================================================================

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // var cityName = document.getElementById('city');
  var search = searchForm.value;
  if (search) {
    // console.log('searching');
    // console.log(city);
    // cityName.textContent = city;
    document.getElementById("main").classList.remove("hide");
    // saveSearch(city);
    // setOneDayData(city);
    // setFiveDay(city);
    capitalizedCityName = capitalize(search);
    convertSearchToCoords(search);
    // .then(getData(cityLat, cityLon));
    // console.log(cityLat, cityLon)
    // getData(cityLat, cityLon);
  } else {
    alert("Please enter a city.");
  }
});

function convertSearchToCoords(search) {
  var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=imperial`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityLat = data.coord.lat;
      cityLon = data.coord.lon;
      // var capitalName = capitalize(data.name);

      getData(cityLat, cityLon);
    });
}

function getData(lat, lon) {
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
      displayData(data);

      // for (let i = 0; i < data.daily.length - 2; i++) {
      //     // console.log(data.daily[i].dt);

      //  let timestamp = new Date(data.daily[i].dt * 1000);
      //  let day = timestamp.getDate();
      //  let month = timestamp.getMonth() + 1;
      //  let year = timestamp.getFullYear();
      // console.log(`${month}/${day}/${year}`);
      // }
      // console.log(data.list.length);
    });
}

function displayData(data) {
  var nameEl = document.getElementById("city");
  nameEl.innerHTML = `${capitalizedCityName} `;
  var uvIdxEl = document.getElementById(`uvIdx-0`);
  var uvIdx = data.daily[0].uvi;
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

  for (let i = 0; i < data.daily.length - 2; i++) {
    // console.log(data.daily[i].dt);
    var dateEl = document.getElementById(`date-${i}`);
    var iconEl = document.getElementById(`icon-${i}`);
    var icon = data.daily[i].weather[0].icon;
    var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    iconEl.setAttribute(`src`, `${iconUrl}`);
    var tempEl = document.getElementById(`temp-${i}`);
    var windEl = document.getElementById(`wind-${i}`);
    var humidityEl = document.getElementById(`humidity-${i}`);
    

    let timestamp = new Date(data.daily[i].dt * 1000);
    let day = timestamp.getDate();
    let month = timestamp.getMonth() + 1;
    let year = timestamp.getFullYear();
    let dateFormat = `${month}/${day}/${year}`;
    dateEl.innerHTML = dateFormat;

    var temp = data.daily[i].temp.day;
    tempEl.innerHTML = `Temp: ${temp}&degF`;

    var wind = data.daily[i].wind_speed;
    windEl.innerHTML = `Wind: ${wind} MPH`;

    var humidity = data.daily[i].humidity;
    humidityEl.innerHTML = `Humidity ${humidity}%`;

    console.log(`${month}/${day}/${year}`);
  }
}

function capitalize(city) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

// daily[0].weather[0].icon;
// daily[0].weather[0].icon