// GLOBAL VARIABLES 
// Selects City Name Input
var searchTextEl = document.getElementById("cityName");
console.log(searchTextEl)
// Selects Search Button
var searchButton = document.getElementsByClassName("btn-primary");
// Selects area to append gray city buttons to append to
var emptyDiv = document.getElementById("emptyDiv");
// Selects City Name Box Header
var cityNameInfo = document.getElementById("cityNameInfo").firstChild;
// Selects list of city name elements
var cityList = document.getElementById("cityList");
// Selects 5 Day Forecast Boxes
var fiveDayBoxes = document.getElementsByClassName("rounded");



// Toggles all buttons
var buttons = document.querySelectorAll('.btn')
buttons.forEach(function (button) {
  var button = new bootstrap.Button(button)
  button.toggle()
});

