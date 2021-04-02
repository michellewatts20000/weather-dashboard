var nameInputEl = document.querySelector('#username');

var search = nameInputEl.value.trim();



var getUserRepos = function (search) {
    var apiUrl = 'https://api.github.com/users/' + search + '/repos';
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayRepos(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
  };
  