var searchButton = document.getElementById("searchButton");
var searchTextEl = document.getElementById("cityName");
var fiveDayBoxes = document.getElementsByClassName("rounded");

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
            getFutureWeather(data[0])
            })
          })
}
// Uses city coordinates to get 5 day weather forecast
function getFutureWeather(pullData) {
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
            // create empty varible to push 5 days of data into
            var emptyVariable = []
            var dataList = data.list;
            // For future forecast days
            for (let i = 1; i < dataList.length; i+=8) {
              var pushData = dataList[i];
              emptyVariable.push(pushData);
            }
            
            // Create new function for printing the results in HTML
            printForecastData(emptyVariable)
            })
          })
}
// Pass through emptyVariable data into forecastData params
function printForecastData(forecastData) {
  console.log(forecastData)
  console.log(forecastData[0].main.temp)
  for (let i = 0; i < fiveDayBoxes.length; i++) {
    // Changes Content of Date on 5 Day Forecast Section

       // HOW DO YOU FORMAT THE DATE?

   fiveDayBoxes[i].children[0].textContent = forecastData[i].dt_txt
  //  fiveDayBoxes[i].children[0].textContent.format(MM/DD/YYYY)

    // Changes the temperature
  fiveDayBoxes[i].children[1].children[0].textContent = `Temp: ` + forecastData[i].main.temp + `F`
    // Changes the wind speed
  fiveDayBoxes[i].children[1].children[1].textContent = `Wind Speed: ` + forecastData[i].wind.speed + ` m/s`
     // Changes the humidity
  fiveDayBoxes[i].children[1].children[2].textContent = `Humidity: ` + forecastData[i].main.humidity + `%`
  }
}

