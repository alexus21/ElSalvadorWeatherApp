export const getDayOrNight = () => {
    const openWeatherMapApiKey = '5d5d1e66b1dd70397908aa7f3a0e71fc';
    const googleTimeZoneApiKey = 'AIzaSyD1yrU17yiScxBNJrZhuoZsdkWOIiUKQqk';
    const lat = '13.466440';
    const lon = '-88.165792';

    // Obtener la latitud y longitud de una ubicación usando OpenWeatherMap
    const apiKey = '5d5d1e66b1dd70397908aa7f3a0e71fc';
    const city = 'Ciudad';
    const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    return fetch(openWeatherMapUrl)
        .then(response => response.json())
        .then(data => {
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;

            // Obtener la zona horaria usando la API de Google Time Zone
            const googleTimeZoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(Date.now() / 1000)}&key=${googleTimeZoneApiKey}`;

            return fetch(googleTimeZoneUrl);
        })
        .then(response => response.json())
        .then(timeZoneData => {
            const timeZoneId = timeZoneData.timeZoneId;
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const isAM = currentTime.toLocaleTimeString('en-US', { timeZone: timeZoneId, hour12: true }).includes('AM');

            // Rango de horas en las que hay sol (ejemplo: de 6 AM a 6 PM)
            const sunriseHour = 6;
            const sunsetHour = 18;

            let result = '';

            if ((isAM && currentHour >= sunriseHour) || (!isAM && currentHour < sunsetHour)) {
                result = 'Día';
            } else {
                result = 'Noche';
            }
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            return 'Error'; // Retorna 'Error' en caso de fallo
        });
};

getDayOrNight().then(dayOrNight => {
    // Muestra el resultado inmediatamente
    return dayOrNight;
});

// Luego, en cualquier parte de tu código, puedes acceder a la variable resultadoDiaNoche para mostrar el valor guardado.

// Por ejemplo:
// console.log('Resultado almacenado:', resultadoDiaNoche);
