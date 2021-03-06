
let timer = null;
let inputValue = document.querySelector('#cityName');
const getWeather = () => {
  let cityName = $('#cityName').val();
  let apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=${CONSTANTS.appId}`;
  $.getJSON(apiCall, (weatherData) => {
    let cityName = weatherData.name;
    let countryName = weatherData.sys.country;
    let description = weatherData.weather[0].description;
    let tempMin = weatherData.main.temp_min;
    let tempMax = weatherData.main.temp_max;
    $("#city").text(cityName);
    $("#detail").text(description);
    $("#country").text(countryName);
    $("#mintemp").html(`Minimum: ${tempMin}<span>&#8451;</span>`);
    $("#maxtemp").html(`Maximum: ${tempMax}<span>&#8451;</span>`);
  })
  .fail(() => { 
    alert("City doesn't Exist!!");
    $('#cityName').val("");
    $("#city").text("");
    $("#detail").text("");
    $("#country").text("");
    $("#mintemp").html("");
    $("#maxtemp").html(""); 
  });
  dateTime();
};

const dateTime = () => {
  switch(UTILS.curr_date)
  {
    case 1||21||31: sup="st";
      break;
    case 2||22: sup="nd";
      break;
    case 3||23: sup="rd";
      break;
    default: sup="th"
      break;
  }
  
  document.getElementById("time").innerHTML = UTILS.getFormattedDateTime();
};

$('.search').click(getWeather);
inputValue.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather();
  }
});

$('#cityName').keydown(() => {
  clearTimeout(timer); 
  timer = setTimeout(getWeather, 1000)
});