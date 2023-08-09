var searchButton = document.getElementById("searchButton");
var searchTextEl = document.getElementById("cityName");
var fiveDayBoxes = document.getElementsByClassName("rounded");
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
// Selects City Name Box Header
var cityNameInfo = document.getElementById("cityNameInfo").firstChild;
// Selects list of city name elements
var cityList = document.getElementById("cityList");

 // Click Event for Search Button 
 searchButton.addEventListener(`click`, inputValidate)
 // Validates input
 function inputValidate(event) {
   if (!searchTextEl.value) {
     return;
   }
   event.preventDefault();

   var search = searchTextEl.value.trim();
   getWeather(search);
   searchTextEl.value = " ";
 }

// Gets ALL weather data from API
function getWeather(city) {

  // Get city coordinates via API
  getCoordinates(city);

  function getCoordinates(search) {
    var apiCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=b98ec477e026dbcba46222f669c18788`
    fetch(apiCityURL)
      .then(function (response) {
        // Stores response in JSON object
        response.json()
          .then(function (data) {
            // Retrieves first city result of our data object
            getFutureWeather(data[0])
          })
      })
  }

  // Uses city coordinates to get 5 day weather forecast
  function getFutureWeather(pullData) {
    // Same as (data[0])
    var { lat, lon } = pullData
    var cityName = pullData.name
    var apiCoordinateURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b98ec477e026dbcba46222f669c18788&units=imperial`
    fetch(apiCoordinateURL)
      .then(function (coordinateResponse) {
        coordinateResponse.json()
          .then(function (data) {
            // create empty varible to push 5 days of data into
            var emptyFutureVariable = []
            var emptyCurrentVariable = []
            var dataList = data.list;

            // For current forecast
            var pushCurrentData = dataList[0]
            emptyCurrentVariable.push(pushCurrentData)

            // For future forecast days
            for (let i = 1; i < dataList.length; i += 8) {
              var pushFutureData = dataList[i];
              emptyFutureVariable.push(pushFutureData);
            }

            // Create new function for printing the results in HTML
            printForecastData(emptyFutureVariable)

            fetch(apiCoordinateURL)
              .then(function (weatherResponse) {
                weatherResponse.json()
                .then(function (weatherData) {
                  // CURRENT DAY DISPLAY

                  // Get weather emoji
                  console.log(emptyCurrentVariable)
                  var weatherIcon = emptyCurrentVariable[0].weather[0].icon
                  var cityCurrentWeatherIcon = weatherIconUrl + weatherIcon + '.png';
                  console.log (cityCurrentWeatherIcon)


                })

              })
            
          })
      })
  }

  // Pass through emptyVariable data into forecastData params
function printForecastData(forecastData) {
  // console.log(forecastData)
  // console.log(forecastData[0].main.temp)
  for (let i = 0; i < fiveDayBoxes.length; i++) {
    // Changes Content of Date on 5 Day Forecast Section
    // Changes the date
    fiveDayBoxes[i].children[0].textContent = dayjs().format('M/D/YYYY');
    // Changes the temperature
    fiveDayBoxes[i].children[1].children[0].textContent = `Temp: ` + forecastData[i].main.temp + `F`
    // Changes the wind speed
    fiveDayBoxes[i].children[1].children[1].textContent = `Wind Speed: ` + forecastData[i].wind.speed + ` m/s`
    // Changes the humidity
    fiveDayBoxes[i].children[1].children[2].textContent = `Humidity: ` + forecastData[i].main.humidity + `%`
  }
}
  // end of wrapped function
}

// Uses city coordinates to get current weather forecast
function getCurrentWeather(pullCurrentData) {
  var { lat, lon } = pullCurrentData
  var city = pullCurrentData.name
  var apiCoordinatesURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b98ec477e026dbcba46222f669c18788&units=imperial`
  fetch(apiCoordinatesURL)
    .then(function (response) {
      // Stores response in JSON object
      return response.json()
        .then(function (data) {
          // Retrieves first city result of our data object
          getCurrentWeather(data[0])
          getFutureWeather(data[0])
          console.log(data.list[0])
        })
    })
}


// Click Event for Gray History Buttons
