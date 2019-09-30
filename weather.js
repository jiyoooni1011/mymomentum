const weather = document.querySelector(".js-weather");

const API_KEY = "587951f13990c0b066f8b917134057f6";
const COORDS = 'coords';

function getWeather(lat, lng){
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  })
  .then(function(json){
    const temp = json.main.temp;
    const place = json.name;
    weather.innerText = `${temp}°c \n @ ${place}`
  });

   // not for network information. to show body object
}
// fetch: get data
// then : 앞의 함수가 다 호출되고 난 다음 작동하게 함

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}  // 좌표를 가져오는 것을 성공했을 때

function handleGeoError(){
  console.log("Cant access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords); // 좌표값을 가지고 있는 경우
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}



function init(){
  loadCoords();
}

init();
