var cityInputEl = document.querySelector('#city-input');
var submitBtn = document.querySelector('#submit');
var weatherContainerEl = document.querySelector('#weather-display');
var cityNameEl = document.querySelector('#city-name');



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
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=2a22b3e133c85e6d24eda75368e647fc';

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

    var justDate = date.split(' ');
   
  

    dateEl = document.createElement('h3');
    dateEl.textContent = justDate[0];
    weatherContainerEl.appendChild(dateEl);

  

    console.log(date);
    console.log(temp);
    console.log(wind);
    console.log(humidity);

  };

  for (var i = 0; i < weathers.length; i++) {

   
    var date = weathers[i].dt_txt;
    var temp = weathers[i].main.temp;
    var wind = weathers[i].wind.speed;
    var humidity = weathers[i].main.humidity;

    // console.log(date);
    // console.log(temp);
    // console.log(wind);
    // console.log(humidity);

  };



    // var repoEl = document.createElement('a');
    // repoEl.classList = 'list-item flex-row justify-space-between align-center';
    // repoEl.setAttribute('href', './single-repo.html?repo=' + weatherLoop);

    // var titleEl = document.createElement('span');
    // titleEl.textContent = weatherLoop;

    // repoEl.appendChild(titleEl);

    // var statusEl = document.createElement('span');
    // statusEl.classList = 'flex-row align-center';

    // if (repos[i].open_issues_count > 0) {
    //   statusEl.innerHTML =
    //     "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    // } else {
    //   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    // }

    // repoEl.appendChild(statusEl);

    // repoContainerEl.appendChild(repoEl);
  
};