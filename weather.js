const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".display");
const apikey = "c3d7ecde41c9ee742a7d711b3af32111";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error(error);
      displayError("City not found or API error");
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=vi`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("City not found");
  }
  const data = await response.json();
  return data;
}

function displayWeatherData(data) {
  const cityName = data.name;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  card.textContent = "";
  card.style.display = "block";

  const cityElement = document.createElement("h2");
  cityElement.textContent = cityName;

  const tempElement = document.createElement("p");
  tempElement.textContent = `Nhiệt độ: ${temp}°C`;

  const descElement = document.createElement("p");
  descElement.textContent = `Thời tiết: ${description}`;

  const iconElement = document.createElement("img");
  iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconElement.alt = description;

  card.appendChild(cityElement);
  card.appendChild(tempElement);
  card.appendChild(descElement);
  card.appendChild(iconElement);
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "block";
  card.appendChild(errorDisplay);
}
