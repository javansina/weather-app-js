const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "8d73f099f44b7630548bf824a6581762";
const button = document.querySelector("button");
const input = document.querySelector("input");
const weatherDiv = document.querySelector("#weather");
const locationIcon = document.querySelector("#location");
const forecastDiv = document.querySelector("#forecast");

const DAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const data = await fetch(url)
    .then((r) => r.json())
    .then((j) => {
      if (j.cod === "404") {
        weatherDiv.classList.add("flex");
        weatherDiv.classList.remove("hidden");
        const weatherJSX = `
        <h1 class="font-bold text-4xl text-abi-200">${j.message}</h1>`;
        weatherDiv.innerHTML = weatherJSX;
        return;
      } else {
        renderCurrentWeather(j);
      }
    })
    .catch((e) => {
      return e.message;
    });

  return data;
};

const getCurrentWeatherByLocation = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const data = await fetch(url)
    .then((r) => r.json())
    .then((j) => {
      if (j.cod === "404") {
        weatherDiv.classList.add("flex");
        weatherDiv.classList.remove("hidden");
        const weatherJSX = `
        <h1 class="font-bold text-4xl text-abi-200">${j.message}</h1>`;
        weatherDiv.innerHTML = weatherJSX;
        return;
      } else {
        renderCurrentWeather(j);
      }
    })
    .catch((e) => {
      return e.message;
    });

  return data;
};
const get5daysWeatherByLocation = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const data = await fetch(url)
    .then((r) => r.json())
    .then((j) => {
      if (j.cod === "404") {
        weatherDiv.classList.add("flex");
        weatherDiv.classList.remove("hidden");
        const weatherJSX = `
        <h1 class="font-bold text-4xl text-abi-200">${j.message}</h1>`;
        weatherDiv.innerHTML = weatherJSX;
        return;
      } else {
        mox(j);
        renderCurrentWeather(j);
      }
    })
    .catch((e) => {
      return e.message;
    });

  return data;
};

const mox = (data) => {
  console.log(data);

  const filterdData = data.list.filter((i) => i.dt_txt.includes("12:00:00"));
  console.log(filterdData);
  renderForecastWeather(filterdData);
  console.log(Date());
};

const renderForecastWeather = (data) => {
  weatherDiv.classList.add("flex");
  weatherDiv.classList.remove("hidden");
  console.log(data[0].weather[0].icon);

  const weatherJSX = data.foreach(
    (i) =>
      `<div id="main" class="flex flex-col items-center gap-y-3 bg-white rounded-xl">
         <div>
           <img class="w-16" src="https://openweathermap.org/img/w/${
             i.weather[0].icon
           }.png"/>
           <h2 class="text-xl font-bold text-abi-200">${
             DAY[new Date(i.dt * 1000).getDay()]
           }</h2>
         </div>
         <span class="mr-2 text-2xl font-semibold text-slate-600">${
           i.weather[0].main
         }</span>
         <p class="font-semibold text-2xl">${Math.round(i.main.temp)}°C</p>
      </div>`
  );
  forecastDiv.innerHTML = weatherJSX
  console.log(weatherJSX);
};

const renderCurrentWeather = (data) => {
  weatherDiv.classList.add("flex");
  weatherDiv.classList.remove("hidden");

  const weatherJSX = `
          <h1 class="font-bold text-3xl text-abi-200">${data.name}, ${
    data.sys.country
  }</h1>
          <div id="main" class="flex items-center gap-x-8">
              <img class="w-24" src="https://openweathermap.org/img/w/${
                data.weather[0].icon
              }.png">
              <span class="mr-2 text-2xl font-semibold text-slate-600">${
                data.weather[0].main
              }</span>
              <p class="font-semibold text-2xl">${Math.round(
                data.main.temp
              )}°C</p>
          </div>
          <div id="info" class="flex">
              <p class="mr-7 font-semibold text-2xl">Humidity : <span class="text-abi-100">${
                data.main.humidity
              } %</span></p>
              <p class="font-semibold text-2xl">Wind Speed : <span class="text-abi-100">${
                data.wind.speed
              } m/s</span></p>
          </div>
      `;
  weatherDiv.innerHTML = weatherJSX;
};

const searchHandler = () => {
  const cityName = input.value;
  if (!cityName) {
    alert("Enter city name");
  } else {
    getCurrentWeatherByName(cityName);
  }
};

const searchHandlerByEnter = (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
};

const seccessLocation = (e) => {
  const { latitude, longitude } = e.coords;
  getCurrentWeatherByLocation(latitude, longitude);
  get5daysWeatherByLocation(latitude, longitude);
};

const errorLocation = (e) => {
  weatherDiv.classList.add("flex");
  weatherDiv.classList.remove("hidden");
  const weatherJSX = `
  <h1 class="font-bold text-4xl text-abi-200">${
    e.code === 1 && "please turn on location!"
  }</h1>`;
  weatherDiv.innerHTML = weatherJSX;
};

const searchHandlerByLocation = () => {
  console.log("SDadasdasds");
  navigator.geolocation.getCurrentPosition(seccessLocation, errorLocation);
};

button.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", searchHandlerByLocation);
window.addEventListener("keydown", searchHandlerByEnter);
