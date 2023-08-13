// GLOBAL VARIABLES
var searchButton = document.getElementById("searchButton");
var searchTextEl = document.getElementById("cityName");
var fiveDayBoxes = document.getElementsByClassName("rounded");
var clearBoxes = document.getElementById("clearText")
var clearBorder = document.getElementById("clearBorder")
// Selects City Name Box Header
var cityNameInfo = document.getElementById("cityNameInfo").firstChild;
// Selects list of city name elements
var cityList = document.getElementById("cityList");

// // Clears out elements... how do I make it come back?
// cityNameInfo.textContent = `Type the name of a city in the search bar!`;
// cityList.textContent = ``;
// clearBoxes.textContent = ``;

function showElements() {
  var x = document.getElementById("hiddenEl");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

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

                    //Gets the current weather icon
                    let locationIcon = document.querySelector('.weather-icon');
                    const icon = emptyCurrentVariable[0].weather[0].icon;
                    locationIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png">`

                    // Display the City Name, Date, and cityCurrentWeatherIcon on cityNameInfo
                    cityNameInfo.textContent = weatherData.city.name + ` ` + dayjs().format(`MMM D, YYYY`)

                    // Display the Temp, Wind, and Humidity on cityList
                    cityList.children[0].textContent = `Temp: ` + weatherData.list[0].main.temp + ` F`
                    cityList.children[1].textContent = `Wind Speed: ` + weatherData.list[0].wind.speed + ` m/s`
                    cityList.children[2].textContent = `Humidity: ` + weatherData.list[0].main.humidity + `%`

                  })

              })

          })
      })
  }

  // Pass through emptyVariable data into forecastData params
  function printForecastData(forecastData) {
    // console.log(forecastData)
    // Changes the Date
    getFutureDates();
    for (let i = 0; i < fiveDayBoxes.length; i++) {
      // Changes Content of Date on 5 Day Forecast Section
      // Changes the temperature
      fiveDayBoxes[i].children[1].children[0].textContent = `Temp: ` + forecastData[i].main.temp + ` F`
      // Changes the wind speed
      fiveDayBoxes[i].children[1].children[1].textContent = `Wind Speed: ` + forecastData[i].wind.speed + ` m/s`
      // Changes the humidity
      fiveDayBoxes[i].children[1].children[2].textContent = `Humidity: ` + forecastData[i].main.humidity + `%`
    }
      // HELP- how do I push the date into my h3
    function getFutureDates() {
      // Declare a date variable set to current date/time:
      let dt = new Date();
      // Box 1
      var dt0 = dt.setDate(dt.getDate() + 1)
      dt0 =  dayjs().format('M/D/YYYY')
      let string1 = dt0.toString();
      fiveDayBoxes[0].children[0].innerHTML = `<h3>${string1}</h3>`

      // Box 2
      var dt1 = dt.setDate(dt.getDate() + 2)
      dt1 =  dayjs().format('M/D/YYYY')
      fiveDayBoxes[1].children[0].textContent = dt1

      // Box 3
      var dt2 = dt.setDate(dt.getDate() + 3)
      dt2 =  dayjs().format('M/D/YYYY')
      fiveDayBoxes[2].children[0].textContent = dt2

      // Box 4
      var dt3 = dt.setDate(dt.getDate() + 4)
      dt3 =  dayjs().format('M/D/YYYY')
      fiveDayBoxes[3].children[0].textContent = dt3

      // Box 5
      var dt4 = dt.setDate(dt.getDate() + 5)
      dt4 =  dayjs().format('M/D/YYYY')
      fiveDayBoxes[4].children[0].textContent = dt4
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