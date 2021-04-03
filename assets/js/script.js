var cityInputEl = document.querySelector('#city-input');
var submitBtn = document.querySelector('#submit');
var weatherContainerEl = document.querySelector('#weather-display');
var cityNameEl = document.querySelector('#city-name');
var cardGroup = document.querySelector('#card-group');
var memoryButton = document.querySelector('#memory-button');

// when user clicks search button run the getCityWeather function
submitBtn.addEventListener("click", getCityWeather);
memoryButton.addEventListener("click", buttonClickHandler);

var buttonClickHandler = function (event) {

  var goHere = event.target.getAttribute('data');
  getCityWeather(goHere);

};


// set local storage on page refresh
setLS();

// format users search term, make sure they enter something
function getCityWeather(event) {
  event.preventDefault();
  var search = cityInputEl.value.trim().toUpperCase();
  if (search) {
    getCityWeather(search);
    weatherContainerEl.textContent = '';
    cityNameEl.value = '';
    cardGroup.textContent = '';
  } else {
    alert('Please enter a city');
  }
};


// call the api and retreive the object data from within the list property
var getCityWeather = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=2a22b3e133c85e6d24eda75368e647fc&units=metric';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
          localStorage.setItem("city", city);
          var cityButton = document.createElement('button');
          cityButton.classList = 'btn btn-success mt-3';
          // cityButton.setAttribute('href', apiUrl);
          cityButton.setAttribute('data', city);
          memoryButton.appendChild(cityButton);
          cityButton.textContent = city;

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather');
    });
};




// loop for today's main weather
var displayWeather = function (data, cityName) {
  if (data.list.length === 0) {
    weatherContainerEl.textContent = 'No repositories found.';
    return;
  }
  // update city name in the html
  cityNameEl.textContent = cityName;

  // call the first object in the array
  for (var i = 0; i < 1; i++) {
    var date = data.list[i].dt_txt;
    var temp = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;
    var icon = data.list[i].weather[i].icon;
    var justDate = date.split(' ');
    var justtemp = Math.round(temp);

    // sets the weather icon
    iconEl = document.createElement('img');
    iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
    weatherContainerEl.appendChild(iconEl);

    dateEl = document.createElement('h4');
    var formatDate = moment(justDate[0]).format('DD/MM/YY');
    dateEl.textContent = "Date: " + formatDate;
    weatherContainerEl.appendChild(dateEl);

    tempEl = document.createElement('h4');
    tempEl.textContent = "Temp: " + justtemp + " C";
    weatherContainerEl.appendChild(tempEl);

    windEl = document.createElement('h4');
    windEl.textContent = "Wind: " + wind + "km/h";
    weatherContainerEl.appendChild(windEl);

    humidEl = document.createElement('h4');
    humidEl.textContent = "Humidity: " + humidity + "%";
    weatherContainerEl.appendChild(humidEl);

    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;

    getUvIndex(lat, lon)

  };

  // loops through the array to pull the 5 days, excluding 3 hour time intervals
  var previousDate = '';
  for (var i = 7; i < 40; i++) {

    var date = data.list[i].dt_txt;
    var currentDate = moment(date).format('L');

    if (currentDate != previousDate) {

      console.log(data.list);
      // var icon2 = data.list[i].weather[i].icon;
      var temp = data.list[i].main.temp;
      var wind = data.list[i].wind.speed;
      var humidity = data.list[i].main.humidity;


      // console.log(icon2);

      newCard = document.createElement('div');
      newCard.classList = 'card';
      cardGroup.appendChild(newCard);
      innerCard = document.createElement('div');
      innerCard.classList = 'card-body';
      newCard.appendChild(innerCard);

      // append the date
      var justDate = date.split(' ');
      var formatDate = moment(justDate[0]).format('dddd');
      cardContent = document.createElement('h4');
      cardContent.textContent = formatDate;
      innerCard.appendChild(cardContent);

      // // append the icon
      // cardContent2 = document.createElement('img');
      // cardContent2.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon2 + '@2x.png');
      // innerCard.appendChild(cardContent2);

      // append the temp
      var justtemp = Math.round(temp);
      cardContent = document.createElement('h4');
      cardContent.textContent = "Temp: " + justtemp + " C";
      innerCard.appendChild(cardContent);

      // append the wind
      cardContent = document.createElement('h4');
      cardContent.textContent = "Wind: " + wind + " km/h";
      innerCard.appendChild(cardContent);

      // append the humidity
      cardContent = document.createElement('h4');
      cardContent.textContent = "Humidity: " + humidity + " %";
      innerCard.appendChild(cardContent);


    }
    previousDate = currentDate;

  }

  // console.log(date);
  // console.log(temp);
  // console.log(wind);
  // console.log(humidity);

};


// calls api to retreive UV index
var getUvIndex = function (lat, lon) {
  var apiKey = "844421298d794574c100e3409cee0499"
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
  fetch(apiURL)
    .then(function (response) {
      response.json().then(function (data) {
        displayUvIndex(data)

      });
    });

}


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



function setLS() {


}