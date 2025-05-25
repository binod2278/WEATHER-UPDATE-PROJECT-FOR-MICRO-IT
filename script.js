const form = document.getElementById('weather-form');
const input = document.getElementById('location-input');
const resultDiv = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const conditionText = document.getElementById('condition-text');
const conditionIcon = document.getElementById('condition-icon');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  const apiKey = '1b6716f83a354890b4b111438252505';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Location not found");
    const data = await res.json();

    cityName.textContent = data.location.name + ', ' + data.location.country;
    temperature.textContent = data.current.temp_c;
    conditionText.textContent = data.current.condition.text;
    conditionIcon.src = data.current.condition.icon;
    resultDiv.classList.remove('hidden');
  } catch (err) {
    alert("Could not fetch weather. Please try a valid city.");
    resultDiv.classList.add('hidden');
  }
});
