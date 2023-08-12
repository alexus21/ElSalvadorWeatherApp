import {getDayOrNight} from "./hora.js";
import {getCityWeatherInfo} from "./uno.js";

const cityImageToDisplay = document.querySelector(".city");

async function fetchWeatherInfo() {
    return await getCityWeatherInfo();
}

const showWeatherInfo = async () => {
    const modalBody = document.querySelector(".modal-body");

    // Borra los elementos previamente existentes para no acumular nada
    while (modalBody.firstChild) {
        modalBody.removeChild(modalBody.firstChild);
    }

    try {
        const weatherInfoArray = await fetchWeatherInfo();

        weatherInfoArray.forEach((item) => {
            const data = document.createElement("p");
            data.textContent = item[0] + item[1]; // Usar el índice 0 y 1 del sub-array
            modalBody.appendChild(data);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}


const ElSalvador = (function(){
    'use strict';

    const _climaSanMiguel = function(){
        cityImageToDisplay.src = "img/san-miguel.png";
        return showWeatherInfo();
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
