import {getDayOrNight} from "./hora.js";

const cityImageToDisplay = document.querySelector(".city");

const ElSalvador = (function(){
    'use strict';

    // async function getCityWeather(city) {
    //     const apiKey = '78a21ef19440fd21f659455f994e9e78'; // Replace with your OpenWeatherMap API key
    //     const lat = 13.47968247583704;
    //     const lon = -88.17767357039016;
    //     const currentTime = Math.floor(Date.now() / 1000); // Get the current Unix timestamp
    //     const apiUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${currentTime}&units=metric&appid=${apiKey}`;
    //
    //     try {
    //         const response = await fetch(apiUrl);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const weatherData = await response.json();
    //
    //         const celsiusTemp = weatherData.current.temp;
    //
    //         console.log(`Clima en ${city}:`);
    //         console.log(`Temperatura: ${celsiusTemp}°C`);
    //         console.log(`Descripción: ${weatherData.current.weather[0].description}`);
    //
    //         const timestamp = currentWeather.dt;
    //         const date = new Date(timestamp * 1000);
    //         const currentTimeFormatted = date.toLocaleTimeString('en-US', {
    //             hour12: false,
    //             hour: 'numeric',
    //             minute: 'numeric',
    //             second: 'numeric'
    //         });
    //
    //         console.log(`Current time in ${city}: ${currentTimeFormatted}`);
    //     } catch (error) {
    //         console.error(`Error retrieving weather data: ${error}`);
    //     }
    // }

// Call the function
//     getCityWeather('San Miguel');


    const _climaSanMiguel = function(){
        cityImageToDisplay.src = "img/san-miguel.png";
        return "Uno";
    }
    const _climaUsulutan = function(){
        cityImageToDisplay.src = "img/usulutan.png";
        return "Dos";
    }
    const _climaLaUnion = function(){
        cityImageToDisplay.src = "img/la-union.png";
        return "Tres";
    }
    const _climaSantaAna = function(){
        cityImageToDisplay.src = "img/santa-ana.png";
        return "Cuatro";
    }
    const _climaSanSalvador = function(){
        cityImageToDisplay.src = "img/san-salvador.png";
        return "Cinco";
    }

    const mostrarClima = function(departamento){
        switch (departamento) {
            case "San Miguel":

                return _climaSanMiguel();
                break;
            case "Usulután":
                return _climaUsulutan();
                break;
            case "La Unión":
                return _climaLaUnion();
                break;
            case "Santa Ana":
                return _climaSantaAna();
                break;
                case "San Salvador":
                    return _climaSanSalvador();
                    break;
            default:
                return "No se encontró";
                break;
        }
    }

    return{
        mostrarClima
    }
})();

// console.log(ElSalvador.SanMiguel.clima());

const setTimeIcon = (function () {
    function setIcon() {
        const timeStatus = getDayOrNight();
        const myImage = document.querySelector(".day-or-night");

        if (timeStatus === "Noche") {
            myImage.src = "img/night.png";
        } else {
            myImage.src = "img/day.png";
        }
        myImage.width = 50;
    }

    setIcon(); // Call the function immediately to set the icon

    return {
        setIcon
    };
})();


//DOM Management:
const citySelect = document.querySelector("[data-select-city]");
const viewWeatherButton = document.querySelector("[data-weather-button]");
const alertMessage = document.querySelector(".alert");

citySelect.addEventListener("change", function () {
    const citySelected = citySelect.options[citySelect.selectedIndex].value;

    if (citySelected === "Selecciona un departamento") {
        alertMessage.classList.remove("d-none");
        viewWeatherButton.disabled = true;
        viewWeatherButton.classList.add("btn-danger");
    } else {
        alertMessage.classList.add("d-none");
        viewWeatherButton.disabled = false;
        viewWeatherButton.classList.remove("btn-danger");
    }
});

viewWeatherButton.addEventListener("click", function () {
    const citySelected = citySelect.options[citySelect.selectedIndex].value;

    if (citySelected === "Selecciona un departamento") {
        alertMessage.classList.remove("d-none");
        viewWeatherButton.disabled = true;
        viewWeatherButton.classList.add("btn-danger");
    }

    ElSalvador.mostrarClima(citySelected);
    viewWeatherButton.setAttribute('data-bs-toggle', 'modal');
    setTimeIcon.setIcon();
});

