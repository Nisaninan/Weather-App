const apiKey = '61ed349f36a83837969de111854e7d0f'; // Get this from https://openweathermap.org/

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherDetails = document.getElementById('weather-details');
    const errorMessage = document.getElementById('error-message');

    if (city === '') {
        errorMessage.textContent = 'Please enter a city name';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            errorMessage.textContent = 'City not found!';
            weatherDetails.innerHTML = '';
            return;
        }

        errorMessage.textContent = ''; // Clear any previous errors
        weatherDetails.innerHTML = `
            <p>City: ${data.name}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
}
