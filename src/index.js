let now = new Date();

let today = document.querySelector("p.today");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) getMinutes = "0" + getMinutes;

today.innerHTML = `${day} ${hour}:${minute}`;

function showWeather(response) {
  let h2 = document.querySelector("h2");
  let h1 = document.querySelector("#city");
  h2.innerHTML = `${Math.round(response.data.main.temp)}° F`;
  h1.innerHTML = `${response.data.name}`;
  document.querySelector("precip").innerHTML = response.data.main.rain;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("#searching");
form.addEventListener("submit", searchBar);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
