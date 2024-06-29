const apiKey = '3261c11cc8a36d9d61acdb7731ebaf07'; 
const weatherInfo = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return { error: error.message };
    }
}

function updateWeatherInfo(data) {
    
    weatherInfo.innerHTML = '';

    if (data.error) {
        weatherInfo.innerHTML = `<p>${data.error}. Please enter a valid city name.</p>`;
    } else {
        const { name, sys, weather, main } = data;
        weatherInfo.innerHTML = `
            <p>Location: ${name}, ${sys.country}</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Temperature: ${main.temp} °C</p>
            <p>Humidity: ${main.humidity}%</p>
        `;
    }
}

searchBtn.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    if (location) {
        const data = await fetchWeatherData(location);
        updateWeatherInfo(data);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
});


