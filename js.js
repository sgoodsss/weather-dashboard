var searchButton = document.getElementById("searchButton");
var searchTextEl = document.getElementById("cityName");

// Click Event for Search Button 
searchButton.addEventListener(`click`, inputValidate)
// Validates input
function inputValidate(event) {
    if (!searchTextEl.value) {
        return;
    } 
    event.preventDefault();

    var search = searchTextEl.value.trim();
    getCoordinates(search);
    // console.log(search)
    searchTextEl.value = " ";
}
// Get city coordinates via API
function getCoordinates(search) {
    console.log(search)
    var apiCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=b98ec477e026dbcba46222f669c18788`
    fetch(apiCityURL)
      .then(function (response) {
        // Stores response in JSON object
            response.json()
          .then(function(data){
            console.log(data)
            // Retrieves first city result of our data object
            getWeather(data[0])
            })
          })
}
// Uses city coordinates to get 5 day weather forecast
function getWeather(pullData) {
  // Same as (data[0])
    console.log(pullData)
    // Where do I put these variables??
    var {lat, lon} = pullData
    var city = pullData.name
    var apiCityURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b98ec477e026dbcba46222f669c18788&units=imperial`
    fetch(apiCityURL)
      .then(function (response) {
            response.json()
          .then(function(data){
            console.log(data)
            // Create new function for printing the results in HTML
            printCurrentData()
            })
          })
}