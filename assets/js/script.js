var cityInputEl = document.querySelector('#city-input');
var submitBtn = document.querySelector('#submit');
var weatherContainerEl = document.querySelector('#weather-display');
var cityNameEl = document.querySelector('#city-name');



submitBtn.addEventListener("click", getCityWeather);


function getCityWeather(event){
  event.preventDefault();
  var search = cityInputEl.value.trim();

  console.log(search);
 

  
  

};


// submitBtn.addEventListener('click', formSubmitHandler);
// console.log(cityInputEl);
// console.log(search);
// var formSubmitHandler = function (event) {
//   event.preventDefault();

//   var search = cityInputEl.value.trim();
// console.log(search);
//   if (search) {
//     getCityWeather(search);

//     // clears contents fix later
//     repoContainerEl.textContent = '';
//     nameInputEl.value = '';
//   } else {
//     alert('Please enter a city');
//   }
// };


// var getCityWeather = function (city) {
//   var apiUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=2a22b3e133c85e6d24eda75368e647fc';

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           displayWeather(data, city);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to Open Weather');
//     });
// };



// var displayWeather = function (repos, cityName) {
//   if (repos.length === 0) {
//     weatherContainerEl.textContent = 'No repositories found.';
//     return;
//   }

//   cityNameEl.textContent = cityName;

//   // for (var i = 0; i < repos.length; i++) {
//   //   var repoName = repos[i].list.main.temp + '/' + repos[i].name;

//   //   var repoEl = document.createElement('a');
//   //   repoEl.classList = 'list-item flex-row justify-space-between align-center';
//   //   repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

//   //   var titleEl = document.createElement('span');
//   //   titleEl.textContent = repoName;

//   //   repoEl.appendChild(titleEl);

//   //   var statusEl = document.createElement('span');
//   //   statusEl.classList = 'flex-row align-center';

//   //   if (repos[i].open_issues_count > 0) {
//   //     statusEl.innerHTML =
//   //       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//   //   } else {
//   //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//   //   }

//   //   repoEl.appendChild(statusEl);

//   //   repoContainerEl.appendChild(repoEl);
// // }
// };