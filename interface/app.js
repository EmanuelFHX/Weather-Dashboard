const form = document.querySelector("#searchForm");
const input = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");
const clearSearch = document.querySelector("#clearSearch");
const recentCitiesEl = document.querySelector("#recentCities");
const statusMessage = document.querySelector("#statusMessage");
const navItems = document.querySelectorAll("[data-view]");
const panels = document.querySelectorAll("[data-panel]");

const els = {
  placeName: document.querySelector("#placeName"),
  weatherIcon: document.querySelector("#weatherIcon"),
  temperature: document.querySelector("#temperature"),
  condition: document.querySelector("#condition"),
  updatedAt: document.querySelector("#updatedAt"),
  feelsLike: document.querySelector("#feelsLike"),
  humidity: document.querySelector("#humidity"),
  wind: document.querySelector("#wind"),
  windDirection: document.querySelector("#windDirection"),
  pressure: document.querySelector("#pressure"),
  detailPressure: document.querySelector("#detailPressure"),
  dewPoint: document.querySelector("#dewPoint"),
  uvIndex: document.querySelector("#uvIndex"),
  uvLabel: document.querySelector("#uvLabel"),
  sunrise: document.querySelector("#sunrise"),
  sunset: document.querySelector("#sunset"),
  forecastList: document.querySelector("#forecastList"),
  timezoneLabel: document.querySelector("#timezoneLabel"),
  insightTitle: document.querySelector("#insightTitle"),
  insightText: document.querySelector("#insightText"),
  favoriteToggle: document.querySelector("#favoriteToggle"),
  themeToggle: document.querySelector("#themeToggle"),
  mapTitle: document.querySelector("#mapTitle"),
  mapFrame: document.querySelector("#mapFrame"),
  openMapButton: document.querySelector("#openMapButton"),
  addFavoriteButton: document.querySelector("#addFavoriteButton"),
  favoritesList: document.querySelector("#favoritesList"),
  saveAlertsButton: document.querySelector("#saveAlertsButton"),
  rainAlert: document.querySelector("#rainAlert"),
  heatAlert: document.querySelector("#heatAlert"),
  windAlert: document.querySelector("#windAlert"),
  alertResults: document.querySelector("#alertResults"),
  saveSettingsButton: document.querySelector("#saveSettingsButton"),
  tempUnit: document.querySelector("#tempUnit"),
  windUnit: document.querySelector("#windUnit"),
  defaultCity: document.querySelector("#defaultCity"),
  reduceMotion: document.querySelector("#reduceMotion"),
};

const weatherCodes = {
  0: ["Céu limpo", "☀", "clear"],
  1: ["Poucas nuvens", "🌤", "clear"],
  2: ["Parcialmente nublado", "⛅", "cloud"],
  3: ["Nublado", "☁", "cloud"],
  45: ["Neblina", "☁", "cloud"],
  48: ["Neblina gelada", "☁", "cloud"],
  51: ["Garoa leve", "🌧", "rain"],
  53: ["Garoa", "🌧", "rain"],
  55: ["Garoa forte", "🌧", "rain"],
  61: ["Chuva leve", "🌧", "rain"],
  63: ["Chuva", "🌧", "rain"],
  65: ["Chuva forte", "🌧", "rain"],
  71: ["Neve leve", "❄", "snow"],
  73: ["Neve", "❄", "snow"],
  75: ["Neve forte", "❄", "snow"],
  80: ["Pancadas leves", "🌧", "rain"],
  81: ["Pancadas de chuva", "🌧", "rain"],
  82: ["Temporal", "⛈", "rain"],
  95: ["Trovoadas", "⛈", "rain"],
  96: ["Trovoadas com granizo", "⛈", "rain"],
  99: ["Trovoadas fortes", "⛈", "rain"],
};

const keys = {
  recent: "weather-dashboard-recent-cities",
  recentWeather: "weather-dashboard-recent-cities-weather",
  favorites: "weather-dashboard-favorites",
  alerts: "weather-dashboard-alerts",
  settings: "weather-dashboard-settings",
};

const defaultAlerts = { rain: 60, heat: 32, wind: 45 };
const defaultSettings = { tempUnit: "c", windUnit: "kmh", defaultCity: "Brasília", reduceMotion: false };

let activeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let recentWeather = {};
let currentPlace = null;
let currentForecast = null;
let alerts = readJson(keys.alerts, defaultAlerts);
let settings = readJson(keys.settings, defaultSettings);

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("hidden", !message);
  statusMessage.style.borderColor = isError ? "rgba(255, 120, 120, 0.46)" : "";
}

function showView(view) {
  panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === view));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  if (view === "map") renderMap();
  if (view === "favorites") renderFavorites();
  if (view === "alerts") renderAlertResults();
}

function getRecentCities() {
  return readJson(keys.recent, []);
}

function getFavorites() {
  return readJson(keys.favorites, []);
}

function saveRecentCity(city, temp, icon) {
  const normalized = city.trim();
  const next = [normalized, ...getRecentCities().filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 5);
  recentWeather[normalized] = { temp, icon };
  writeJson(keys.recent, next);
  writeJson(keys.recentWeather, recentWeather);
  renderRecentCities();
}

function loadRecentWeather() {
  recentWeather = readJson(keys.recentWeather, {});
}

function renderRecentCities() {
  const cities = getRecentCities();
  recentCitiesEl.innerHTML = "";

  if (!cities.length) {
    recentCitiesEl.innerHTML = '<p class="empty-recent">Pesquise uma cidade para montar seu histórico.</p>';
    return;
  }

  cities.forEach((city) => {
    const cached = recentWeather[city] ?? {};
    const button = document.createElement("button");
    button.className = "recent-city";
    button.type = "button";
    button.innerHTML = `<span aria-hidden="true">${cached.icon ?? "☁"}</span><strong>${city}</strong><small>${cached.temp ?? "--"}°C</small>`;
    button.addEventListener("click", () => {
      input.value = city;
      searchWeather(city);
      showView("weather");
    });
    recentCitiesEl.appendChild(button);
  });
}

function weatherInfo(code, isDay = 1) {
  const info = weatherCodes[code] ?? ["Condição variável", "☁", "cloud"];
  if (!isDay && info[2] === "clear") return ["Céu limpo à noite", "☾", "night"];
  if (!isDay && info[2] === "cloud") return [info[0], "☁", "night"];
  return info;
}

function setWeatherTheme(theme) {
  document.body.classList.remove("weather-clear", "weather-rain", "weather-cloud", "weather-night", "weather-snow");
  document.body.classList.add(`weather-${theme}`);
}

function formatWeatherDate(dateValue, options) {
  const normalizedValue = dateValue.includes("T") ? dateValue : `${dateValue}T12:00:00`;
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", ...options }).format(new Date(`${normalizedValue}Z`));
}

function formatTime(dateValue) {
  return formatWeatherDate(dateValue, { hour: "2-digit", minute: "2-digit" });
}

function round(value) {
  return Math.round(Number(value));
}

function displayTemp(value) {
  const celsius = round(value);
  return settings.tempUnit === "f" ? round((celsius * 9) / 5 + 32) : celsius;
}

function tempSuffix() {
  return settings.tempUnit === "f" ? "°F" : "°C";
}

function displayWind(value) {
  return settings.windUnit === "ms" ? `${Math.round((Number(value) / 3.6) * 10) / 10} m/s` : `${round(value)} km/h`;
}

function windCompass(degrees) {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
  return directions[Math.round(degrees / 22.5) % 16];
}

function uvRisk(value) {
  if (value < 3) return ["Baixo", "low"];
  if (value < 6) return ["Moderado", "medium"];
  if (value < 8) return ["Alto", "high"];
  return ["Muito alto", "very-high"];
}

function placeLabel(place) {
  const brazilStates = {
    Acre: "AC", Alagoas: "AL", Amapá: "AP", Amazonas: "AM", Bahia: "BA", Ceará: "CE", "Distrito Federal": "DF",
    "Espírito Santo": "ES", Goiás: "GO", Maranhão: "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG", Pará: "PA", Paraíba: "PB", Paraná: "PR", Pernambuco: "PE", Piauí: "PI",
    "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS", Rondônia: "RO",
    Roraima: "RR", "Santa Catarina": "SC", "São Paulo": "SP", Sergipe: "SE", Tocantins: "TO",
  };
  const region = place.country_code === "BR" ? brazilStates[place.admin1] || place.admin1 : place.admin1 || place.country_code || place.country;
  return [place.name, region].filter(Boolean).join(", ");
}

async function geocodeCity(city) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.search = new URLSearchParams({ name: city, count: "1", language: "pt", format: "json" });
  const response = await fetch(url);
  if (!response.ok) throw new Error("Não foi possível buscar a cidade.");
  const data = await response.json();
  if (!data.results?.length) throw new Error("Cidade não encontrada. Tente incluir o país ou estado.");
  return data.results[0];
}

async function fetchForecast(place) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,dew_point_2m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error("Não foi possível carregar a previsão.");
  return response.json();
}

function renderForecast(daily) {
  els.forecastList.innerHTML = "";
  daily.time.forEach((date, index) => {
    const [summary, icon] = weatherInfo(daily.weather_code[index]);
    const rainChance = daily.precipitation_probability_max?.[index] ?? 0;
    const card = document.createElement("article");
    card.className = "forecast-day";
    card.title = summary;
    card.innerHTML = `
      <div><div class="day">${formatWeatherDate(date, { weekday: "long" })}</div><div class="date">${formatWeatherDate(date, { day: "2-digit", month: "short" })}</div></div>
      <div class="icon" aria-hidden="true">${icon}</div>
      <div class="range">${displayTemp(daily.temperature_2m_max[index])}° <span>${displayTemp(daily.temperature_2m_min[index])}°</span></div>
      <div class="rain-chance">♢ ${rainChance}%</div>
    `;
    els.forecastList.appendChild(card);
  });
}

function renderInsight(daily, condition) {
  const rainChance = daily.precipitation_probability_max?.[0] ?? 0;
  if (rainChance >= 50 || condition.toLowerCase().includes("chuva")) {
    els.insightTitle.textContent = "Há chance de chuva durante a noite.";
    els.insightText.textContent = "Leve um guarda-chuva se for sair.";
  } else if ((daily.uv_index_max?.[0] ?? 0) >= 6) {
    els.insightTitle.textContent = "O índice UV pode ficar alto hoje.";
    els.insightText.textContent = "Use protetor solar e evite exposição prolongada no pico do dia.";
  } else {
    els.insightTitle.textContent = "Condições estáveis para as próximas horas.";
    els.insightText.textContent = "Acompanhe vento e umidade se for planejar atividades ao ar livre.";
  }
}

function renderWeather(place, forecast) {
  const current = forecast.current;
  activeTimezone = forecast.timezone || activeTimezone;
  currentPlace = place;
  currentForecast = forecast;

  const [condition, icon, theme] = weatherInfo(current.weather_code, current.is_day);
  const [uvLabel] = uvRisk(forecast.daily.uv_index_max?.[0] ?? 0);
  const pressure = `${round(current.pressure_msl)} hPa`;

  input.value = place.name;
  els.placeName.textContent = placeLabel(place);
  els.weatherIcon.textContent = icon;
  els.temperature.textContent = displayTemp(current.temperature_2m);
  document.querySelector(".temperature").lastChild.textContent = tempSuffix();
  els.condition.textContent = condition;
  els.updatedAt.textContent = `${formatWeatherDate(current.time, { weekday: "long", day: "2-digit", month: "long" })} · ${formatTime(current.time)}`;
  els.feelsLike.textContent = `${displayTemp(current.apparent_temperature)}${tempSuffix()}`;
  els.humidity.textContent = `${current.relative_humidity_2m}%`;
  els.wind.textContent = displayWind(current.wind_speed_10m);
  els.windDirection.textContent = windCompass(current.wind_direction_10m);
  els.pressure.textContent = pressure;
  els.detailPressure.textContent = pressure;
  els.dewPoint.textContent = `${displayTemp(current.dew_point_2m)}${tempSuffix()}`;
  els.uvIndex.textContent = round(forecast.daily.uv_index_max?.[0] ?? 0);
  els.uvLabel.textContent = uvLabel;
  els.sunrise.textContent = formatTime(forecast.daily.sunrise[0]);
  els.sunset.textContent = formatTime(forecast.daily.sunset[0]);
  els.timezoneLabel.textContent = activeTimezone.replace("_", " ");

  setWeatherTheme(theme);
  renderForecast(forecast.daily);
  renderInsight(forecast.daily, condition);
  saveRecentCity(place.name, displayTemp(current.temperature_2m), icon);
  renderMap();
  renderAlertResults();
  updateFavoriteButton();
}

function renderMap() {
  if (!currentPlace) return;
  const { latitude, longitude, name } = currentPlace;
  els.mapTitle.textContent = placeLabel(currentPlace);
  els.mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.18}%2C${latitude - 0.12}%2C${longitude + 0.18}%2C${latitude + 0.12}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  els.openMapButton.onclick = () => window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${name} ${currentPlace.country ?? ""}`)}`, "_blank", "noopener");
}

function updateFavoriteButton() {
  if (!currentPlace) return;
  const isFavorite = getFavorites().some((fav) => fav.id === currentPlace.id);
  els.favoriteToggle.textContent = isFavorite ? "★" : "☆";
}

function toggleFavorite() {
  if (!currentPlace || !currentForecast) return;
  const favorites = getFavorites();
  const exists = favorites.some((fav) => fav.id === currentPlace.id);
  const next = exists
    ? favorites.filter((fav) => fav.id !== currentPlace.id)
    : [{ id: currentPlace.id, name: currentPlace.name, label: placeLabel(currentPlace), latitude: currentPlace.latitude, longitude: currentPlace.longitude, country: currentPlace.country }, ...favorites].slice(0, 12);
  writeJson(keys.favorites, next);
  updateFavoriteButton();
  renderFavorites();
}

function renderFavorites() {
  const favorites = getFavorites();
  els.favoritesList.innerHTML = "";
  if (!favorites.length) {
    els.favoritesList.innerHTML = '<p class="empty-state">Nenhuma cidade favorita ainda.</p>';
    return;
  }
  favorites.forEach((favorite) => {
    const row = document.createElement("div");
    row.className = "saved-item";
    row.innerHTML = `<div><strong>${favorite.label}</strong><small>${favorite.country ?? ""}</small></div><div class="item-actions"><button type="button" data-open="${favorite.name}">Ver clima</button><button type="button" data-remove="${favorite.id}">Remover</button></div>`;
    row.querySelector("[data-open]").addEventListener("click", () => {
      searchWeather(favorite.name);
      showView("weather");
    });
    row.querySelector("[data-remove]").addEventListener("click", () => {
      writeJson(keys.favorites, getFavorites().filter((fav) => fav.id !== favorite.id));
      renderFavorites();
      updateFavoriteButton();
    });
    els.favoritesList.appendChild(row);
  });
}

function renderAlertResults() {
  if (!currentForecast) return;
  const current = currentForecast.current;
  const daily = currentForecast.daily;
  const hits = [];
  if ((daily.precipitation_probability_max?.[0] ?? 0) >= alerts.rain) hits.push(`Chuva: ${daily.precipitation_probability_max[0]}%`);
  if (current.temperature_2m >= alerts.heat) hits.push(`Calor: ${round(current.temperature_2m)}°C`);
  if (current.wind_speed_10m >= alerts.wind) hits.push(`Vento: ${round(current.wind_speed_10m)} km/h`);
  els.alertResults.innerHTML = hits.length
    ? hits.map((hit) => `<div class="alert-hit">${hit}</div>`).join("")
    : '<p class="empty-state">Nenhum alerta disparado para a cidade atual.</p>';
}

function applySettingsToForm() {
  els.tempUnit.value = settings.tempUnit;
  els.windUnit.value = settings.windUnit;
  els.defaultCity.value = settings.defaultCity;
  els.reduceMotion.checked = settings.reduceMotion;
  document.body.classList.toggle("reduce-motion", settings.reduceMotion);
  els.themeToggle.textContent = settings.reduceMotion ? "◌" : "☾";
  els.rainAlert.value = alerts.rain;
  els.heatAlert.value = alerts.heat;
  els.windAlert.value = alerts.wind;
}

function saveAlertSettings() {
  alerts = {
    rain: Number(els.rainAlert.value) || defaultAlerts.rain,
    heat: Number(els.heatAlert.value) || defaultAlerts.heat,
    wind: Number(els.windAlert.value) || defaultAlerts.wind,
  };
  writeJson(keys.alerts, alerts);
  renderAlertResults();
  showStatus("Alertas salvos no navegador.");
  setTimeout(() => showStatus(""), 1600);
}

function saveSettings() {
  settings = {
    tempUnit: els.tempUnit.value,
    windUnit: els.windUnit.value,
    defaultCity: els.defaultCity.value.trim() || defaultSettings.defaultCity,
    reduceMotion: els.reduceMotion.checked,
  };
  writeJson(keys.settings, settings);
  applySettingsToForm();
  if (currentPlace && currentForecast) renderWeather(currentPlace, currentForecast);
  showStatus("Configurações salvas no navegador.");
  setTimeout(() => showStatus(""), 1600);
}

async function searchWeather(city) {
  const query = city.trim();
  if (!query) return;
  searchButton.disabled = true;
  showStatus("Carregando clima...");
  try {
    const place = await geocodeCity(query);
    const forecast = await fetchForecast(place);
    renderWeather(place, forecast);
    showStatus("");
  } catch (error) {
    showStatus(error.message, true);
  } finally {
    searchButton.disabled = false;
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    showView(item.dataset.view);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchWeather(input.value);
  showView("weather");
});

clearSearch.addEventListener("click", () => {
  input.value = "";
  input.focus();
});

els.favoriteToggle.addEventListener("click", toggleFavorite);
els.addFavoriteButton.addEventListener("click", toggleFavorite);
els.saveAlertsButton.addEventListener("click", saveAlertSettings);
els.saveSettingsButton.addEventListener("click", saveSettings);
els.themeToggle.addEventListener("click", () => {
  settings.reduceMotion = !settings.reduceMotion;
  writeJson(keys.settings, settings);
  applySettingsToForm();
});

loadRecentWeather();
renderRecentCities();
applySettingsToForm();
renderFavorites();
searchWeather(getRecentCities()[0] || settings.defaultCity);
