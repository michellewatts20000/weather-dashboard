var cityInputEl = document.querySelector('#city-input');
var submitBtn = document.querySelector('#submit');
var weatherContainerEl = document.querySelector('#weather-display');
var cityNameEl = document.querySelector('#city-name');
var cardGroup = document.querySelector('#card-group');



submitBtn.addEventListener("click", getCityWeather);


function getCityWeather(event) {
  event.preventDefault();
  var search = cityInputEl.value.trim().toUpperCase();

  if (search) {
    getCityWeather(search);

    // clears contents fix later
    weatherContainerEl.textContent = '';
    cityNameEl.value = '';
  } else {
    alert('Please enter a city');
  }
};

var getCityWeather = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=2a22b3e133c85e6d24eda75368e647fc&units=metric';

  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data.list);
          console.log(data);
          displayWeather(data.list, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather');
    });
};



var displayWeather = function (weathers, cityName) {
  if (weathers.length === 0) {
    weatherContainerEl.textContent = 'No repositories found.';
    return;
  }

  cityNameEl.textContent = cityName;

  for (var i = 0; i < 1; i++) {

    var date = weathers[i].dt_txt;
    var temp = weathers[i].main.temp;
    var wind = weathers[i].wind.speed;
    var humidity = weathers[i].main.humidity;
    var icon = weathers[i].weather[i].icon;

    var justDate = date.split(' ');
    var justtemp = Math.round(temp);

    iconEl = document.createElement('img');
    iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
    weatherContainerEl.appendChild(iconEl);

    dateEl = document.createElement('h4');
    dateEl.textContent = "Date: " + justDate[0];
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




  };

  for (var i = 0; i < 7; i++) {


    var date = weathers[i].dt_txt;

   
      // var temp = weathers[i].main.temp;
      // var wind = weathers[i].wind.speed;
      // var humidity = weathers[i].main.humidity;


      newCard = document.createElement('div');
      newCard.classList = 'card';
      cardGroup.appendChild(newCard);

      innerCard = document.createElement('div');
      innerCard.classList = 'card-body';
      newCard.appendChild(innerCard);

      cardContent = document.createElement('h4');
      cardContent.textContent = date;
      innerCard.appendChild(cardContent);

   


  };




};




// console.log(date);
// console.log(temp);
// console.log(wind);
// console.log(humidity);