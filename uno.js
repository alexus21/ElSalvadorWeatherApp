function temperatura() {
    const apiKey = '5d5d1e66b1dd70397908aa7f3a0e71fc';
    const city = 'Ciudad';
    const lat = '13.466440';
    const lon = '-88.165792';
    let temperatura = -1000;

// URL de la API de OpenWeatherMap
//const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// Realiza una solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extrae los datos climáticos relevantes de la respuesta
            const weather = data.weather[0].description;
            const temperature = (data.main.temp - 273.15).toPrecision(5);
            const humidity = data.main.humidity;

            console.log('Clima:', weather);
            console.log('Temperatura:', temperature + '°C');
            console.log('Humedad:', humidity + '%');
            temperatura = temperature;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    console.log(temperatura);
    return temperatura;
}
