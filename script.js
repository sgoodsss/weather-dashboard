// TODO:
// when user searches for a city (clicks search button):
//  - store the user input in a variable
//  - use a fetch api to get the current & future conditions for that city
//  - store that city into local storage

// use the data from fetch to populate in the current-weather container:
//  - name and today's date as M/DD/YYY
//  - an icon reprsentation of weather conditions
//  - temp
//  - wind
//  - humidity

// use the data from fetch to populate in the five-day container:
//  - date
//  - an icon reprsentation of weather conditions
//  - the temp
//  - wind speed

//  - when you click the button it displays the current and future conditions for that city

// GLOBAL VARIABLES 
// Selects City Name Input
var searchTextEl = document.getElementById("cityName");
console.log(searchTextEl)
// Selects Search Button
var searchButton = document.getElementsByClassName("btn-primary");
// Selects City Name Box Header
var cityNameInfo = document.getElementById("cityNameInfo").firstChild;
// Selects list of city name elements
var cityList = document.getElementById("cityList");
// Selects 5 Day Forecast Boxes
var fiveDayBoxes = document.getElementsByClassName("rounded");


// Toggles all buttons using Bootstrap
var buttons = document.querySelectorAll('.btn')
buttons.forEach(function (button) {
  var button = new bootstrap.Button(button)
  button.toggle()
});

// Geocoding API
// Coverts city names to coordinates
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid=b98ec477e026dbcba46222f669c18788

var getWeather = () => {
  // Hard coded in Chicago to test it
  fetch(api.openweathermap.org/data/2.5/forecast?q=Chicago&appid=b98ec477e026dbcba46222f669c18788)
  .then(response => response.json())
  // Don't know what to put here???
  .then()
}

// Get Weather By City Search Bar
searchButton.addEventListener(`search`, (event) => {
  event.preventdefault()
  var cityNameValue = searchTextEl.value;

  console.log(`User requested weather for ${cityNameValue}`)

  // Clears everything on the right side
  searchTextEl.innerHTML = ``;
  cityNameInfo.innerHTML = ``;
  cityList.innerHTML = ``;
  fiveDayBoxes.innerHTML = ``;

  // getWeather(`url to get weather`)

})
// Get Weather by Clicking a Gray Button

