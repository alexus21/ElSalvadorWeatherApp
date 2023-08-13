export const getCityWeatherInfo = async (latitud, longitud) => {
    const apiKey = '5d5d1e66b1dd70397908aa7f3a0e71fc';
    const city = 'Ciudad';
    const lat = latitud;
    const lon = longitud;
    let temperatura = -1000;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=16&units=metric&lang=es&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weather = data.weather[0].description;
        const temperature = data.main.temp.toPrecision(4);
        const max = data.main.temp_max.toPrecision(4);
        const min = data.main.temp_min.toPrecision(4);
        const humidity = data.main.humidity;

        return [
            ["Clima: ", weather],
            ["Temperatura: ", temperature + " °C"],
            ["Máxima: ", max +  " °C"],
            ["Mínima: ", min +  " °C"],
            ["Humedad: ", humidity +  " °C"]
        ];
    } catch (error) {
        console.error('Error:', error);
    }
};
