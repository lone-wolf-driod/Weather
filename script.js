function getWeather() {
  const cityInput = document.getElementById('cityInput');
  const weatherResult = document.getElementById('weatherResult');
  const weatherIcon = document.getElementById('weatherIcon');

  // Get the city name from the input field
  const cityName = cityInput.value;

  // Check if the input is not empty
  if (cityName.trim() === '') {
    alert('Please enter a city name');
    return;
  }
  
  // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
  const apiKey = '97e44f8f0341ae5aadd742a88328a413';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  // Fetch weather data from OpenWeatherMap API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        // Handle case where city is not found
        weatherResult.textContent = 'City not found. Please enter a valid city name.';
        weatherIcon.innerHTML = '';
      } else {
        // Display weather information
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        weatherResult.innerHTML = `<p>City: ${cityName}</p><p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;

        // Display weather icon
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherResult.textContent = 'An error occurred while fetching weather data. Please try again.';
      weatherIcon.innerHTML = '';
    });
}
