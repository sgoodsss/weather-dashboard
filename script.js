// GLOBAL VARIABLES 
// Selects City Name Input
var searchTextEl = document.getElementById("cityName");
// Selects Search Button
var searchButton = document.getElementById("searchButton");
// Selects City Name Box Header
var cityNameInfo = document.getElementById("cityNameInfo").firstChild;
// Selects list of city name elements
var cityList = document.getElementById("cityList");
// Selects 5 Day Forecast Boxes
var fiveDayBoxes = document.getElementsByClassName("rounded");
// My Personal API Key
var openWeatherApiKey = 'b98ec477e026dbcba46222f669c18788';
// URL to fetch data by city name
var openWeatherCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

// Geocoding API
// Coverts city names to coordinates
// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=b98ec477e026dbcba46222f669c18788

// TODO:
// when user searches for a city (clicks search button):
// Validate user input
//  - store the user input in a variable
//  - use a fetch api to get the current & future conditions for that city
//  - store that city into local storage

// Function to get weather data from apiUrl
// function getWeather(city) {
//   // Click event for search button
//   searchButton.addEventListener(`click`, function () {
//     // Makes first letter of the user input capital
//     var str = searchTextEl.value;
//     var str2 = str.charAt(0).toUpperCase() + str.slice(1);
//     console.log(str2);

//     // API URL for city
//     var apiCityUrl = openWeatherCityUrl + str2 + '&appid=' + openWeatherApiKey;
    
//     // Need help with this
//     fetch(apiCityURL)
//       .then(function (response) {
//         response.json()
//       .then(function(data){
//         console.log(`Sarah is the smartest`)
//         // Not working
//         })
//       })
// })
// }


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

// Toggles all buttons using Bootstrap
var buttons = document.querySelectorAll('.btn')
buttons.forEach(function (button) {
  var button = new bootstrap.Button(button)
  button.toggle()
});

// Get Weather By City Search Bar
// searchButton.addEventListener(`search`, (event) => {
//   event.preventdefault()
//   var cityNameValue = searchTextEl.value;

//   console.log(`User requested weather for ${cityNameValue}`)

//   // Clears everything on the right side
//   searchTextEl.innerHTML = ``;
//   cityNameInfo.innerHTML = ``;
//   cityList.innerHTML = ``;
//   fiveDayBoxes.innerHTML = ``;

//   // getWeather(`url to get weather`)

// })
// Get Weather by Clicking a Gray Button

