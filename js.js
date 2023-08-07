var searchButton = document.getElementById("searchButton");
var searchTextEl = document.getElementById("cityName");


searchButton.addEventListener(`click`, inputValidate)

function inputValidate(event) {
    if (!searchTextEl.value) {
        return;
    } 
    event.preventDefault();

    var search = searchTextEl.value.trim();
    getCoordinates(search);
    console.log(search)
    searchTextEl.value = " ";
}

function getCoordinates(search) {
    console.log(search)
    var apiCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=b98ec477e026dbcba46222f669c18788`
    fetch(apiCityURL)
      .then(function (response) {
            response.json()
          .then(function(data){
            console.log(data)
            getWeather(data[0])
            })
          })
}

function getWeather(pullData) {
    console.log(pullData)
    var {lat, lon} = pullData
    var city = pullData.name
    var apiCityURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b98ec477e026dbcba46222f669c18788`
    fetch(apiCityURL)
      .then(function (response) {
            response.json()
          .then(function(data){
            console.log(data)
            })
          })
}