const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "8d73f099f44b7630548bf824a6581762";
const button = document.querySelector("button");
const input = document.querySelector("input");
const weatherDiv = document.querySelector("#weather");

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

const renderCurrentWeather = (data) => {
  weatherDiv.classList.add("flex");
  weatherDiv.classList.remove("hidden");

  const weatherJSX = `
        <h1 class="font-bold text-5xl text-abi-200">${data.name}, ${
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

const searchHandler = async () => {
  const cityName = input.value;

  if (!cityName) {
    alert("Enter city name");
  } else {
    const currentData = await getCurrentWeatherByName(cityName);
  }
};

const searchHandlerByEnter = (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
};

button.addEventListener("click", searchHandler);
window.addEventListener("keydown", searchHandlerByEnter);
