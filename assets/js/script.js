var cityInputEl = document.querySelector('#city-input');
var submitBtn = document.querySelector('#submit');
var weatherContainerEl = document.querySelector('#weather-display');
var cityNameEl = document.querySelector('#city-name');
var cardGroup = document.querySelector('#card-group');
var savedBtn = document.querySelector('#hereThis');
var clearBtn = document.querySelector('#btnclear');
var cardsShow = document.querySelector('.card');
var hideThis = document.querySelector('#disappear');
var key = config.SECRET_API_KEY;

console.log(key);

// where the local storage goes
var cities = JSON.parse(localStorage.getItem("cities")) || [];

// when user clicks search button run the getCityWeather function
submitBtn.addEventListener("click", getCityWeather);

// format users search term, make sure they enter something
function getCityWeather(event) {
  event.preventDefault();
  cardsShow.setAttribute('border', '1px');
  var search = cityInputEl.value.trim().toUpperCase();
  if (search) {
    getCityWeather(search);
    weatherContainerEl.textContent = '';
    cityNameEl.textContent = '';
    cardGroup.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a city');
  }
};

// call the api and retreive the object data from within the list property
var getCityWeather = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key + '&units=metric';
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
          hideThis.style.display = "block";

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to the Open Weather API');
    });
  cities.push(city);
  saveSearch();
  pastSearch(city);
};

// sets the local storage
function saveSearch() {
  localStorage.setItem("cities", JSON.stringify(cities));
};

// get local storage on a page refresh
getStorage();

function getStorage() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));
  if (storedCities === null) {
    return;
  }
  for (var i = 0; i < storedCities.length; i++) {
    var cityButton = document.createElement('button');
    cityButton.classList = 'btn btn-warning mt-3';
    cityButton.setAttribute('data', storedCities[i]);
    cityButton.setAttribute('id', 'click');
    savedBtn.appendChild(cityButton);
    cityButton.textContent = storedCities[i];
  }
  if (storedCities !== null) {
    cities = storedCities;
  }
};

// dynamically makes buttons from previous searches
var pastSearch = function (city) {
  var cityButton = document.createElement('button');
  cityButton.classList = 'btn btn-warning mt-3';
  cityButton.setAttribute('data', city);
  cityButton.setAttribute('id', 'click');
  savedBtn.appendChild(cityButton);
  cityButton.textContent = city;
};

// make an api call on the saved 
var pastSearchHandler = function (event) {
  var city = event.target.getAttribute("data")
  weatherContainerEl.textContent = '';
  cityNameEl.value = '';
  cardGroup.textContent = '';
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key + '&units=metric';
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
          hideThis.style.display = "block";
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to the Open Weather API');
    });
};

// when clicked on a history button run the pastSearchHandler
savedBtn.addEventListener("click", pastSearchHandler);

// loop for today's main weather
function displayWeather(data, city) {
  if (data.list.length === 0) {
    weatherContainerEl.textContent = 'No weather found.';
    return;
  }

  // update city name in the html
  cityNameEl.textContent = city + ", " + data.city.country;
  for (let i = 0; i < 1; i++) {
    var date = data.list[i].dt_txt;
    var temp = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;
    var iconWeather = data.list[i].weather[0].icon;
    var justDate = date.split(' ');
    var justTemp = Math.round(temp);

      // shows the date
      dateEl = document.createElement('h4');
      var formatDate = moment(justDate[0]).format('dddd, MMMM Do YYYY');
      dateEl.textContent = formatDate;
      weatherContainerEl.appendChild(dateEl);
      
      // sets the weather icon
      iconEl = document.createElement('img');
      iconEl.setAttribute('src', 'https://openweathermap.org/img/wn/' + iconWeather + '@2x.png');
      weatherContainerEl.appendChild(iconEl);

      // shows the temp
      tempEl = document.createElement('h4');
      tempEl.textContent = "Temp: " + justTemp + "\xB0C";
      weatherContainerEl.appendChild(tempEl);

      // shows the humidity
      humidEl = document.createElement('h4');
      humidEl.textContent = "Humidity: " + humidity + "%";
      weatherContainerEl.appendChild(humidEl);

      // shows the wind
      windEl = document.createElement('h4');
      windEl.textContent = "Wind: " + wind + " km/h";
      weatherContainerEl.appendChild(windEl);

      // get data to display UV index
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      getUvIndex(lat, lon);
      getFiveDay(data);
    }
};

function getFiveDay(data) {
  // loops through the array to pull the 5 days, excluding 3 hour time intervals
  var forecast = data.list;

  for (var i = 0; i < forecast.length; i++) {
    var date = data.list[i].dt_txt;
    var iconic = data.list[i].weather[0].icon;
    var temp = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;
    var justDate = date.split(' ');
    var formatDate = moment(justDate[0]).format('dddd');

    // return day result for future days
    if (justDate[1] === "03:00:00") {

      // creates a card for each new day in the 5 days
      newCard = document.createElement('div');
      newCard.classList = 'card text-white bg-primary m-1';
      cardGroup.appendChild(newCard);
      innerCard = document.createElement('div');
      innerCard.classList = 'card-body';
      newCard.appendChild(innerCard);

      // append the date

      cardContent = document.createElement('h4');
      cardContent.textContent = formatDate;
      innerCard.appendChild(cardContent);

      // append the icon
      cardContent = document.createElement("img")
      cardContent.setAttribute('src', 'https://openweathermap.org/img/wn/' + iconic + '@2x.png');
      innerCard.appendChild(cardContent);

      // append the temp
      var justtemp = Math.round(temp);
      cardContent = document.createElement('h4');
      cardContent.textContent = "Temp: " + justtemp + "\xB0C";
      innerCard.appendChild(cardContent);

      // append the humidity
      cardContent = document.createElement('h4');
      cardContent.textContent = "Humidity: " + humidity + "%";
      innerCard.appendChild(cardContent);

      // append the wind
      cardContent = document.createElement('h4');
      cardContent.textContent = "Wind: " + wind + " km/h";
      innerCard.appendChild(cardContent);
    }
  }
};

// calls api to retreive UV index
var getUvIndex = function (lat, lon) {
  var apiURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + key + '&lat=' + lat + '&lon=' + lon;
  fetch(apiURL)
    .then(function (response) {
      response.json().then(function (data) {
        displayUvIndex(data);
      });
    });
};

// appends UV index to today's weather and gives it a background colour based on its value
var displayUvIndex = function (index) {
  uvIndexValue = document.createElement("h4")
  uvIndexValue.textContent = "UV Index: " + index.value;
  if (index.value <= 2) {
    uvIndexValue.classList = "favorable"
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate "
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe"
  };
  weatherContainerEl.appendChild(uvIndexValue);
}

// on click run clear storage
clearBtn.addEventListener("click", clearStorage);

// clears the storages where previous searches are stored
function clearStorage() {
  localStorage.clear();
  savedBtn.innerHTML = "";
  weatherContainerEl.textContent = '';
  cityNameEl.value = '';
  cardGroup.textContent = '';
  cities = [];
  hideThis.style.display = "none";
};