if (typeof API_KEY === "undefined") {
    document.getElementById("error").innerText = "API key missing! Please add config.js";
    throw new Error("API_KEY not found");
}

const apiKey = API_KEY;
function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) return;

    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    });
}

function fetchWeather(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.cod !== 200) {
                document.getElementById("error").innerText = "City not found! Try: Nashik / Mumbai";
                document.getElementById("weather").style.display = "none";
                return;
            }

            document.getElementById("error").innerText = "";
            document.getElementById("weather").style.display = "block";

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
            document.getElementById("condition").innerText = data.weather[0].description;

            document.getElementById("feels").innerText = Math.round(data.main.feels_like) + "°C";
            document.getElementById("humidity").innerText = data.main.humidity + "%";
            document.getElementById("wind").innerText = data.wind.speed + " km/h";
            document.getElementById("pressure").innerText = data.main.pressure + " hPa";

            document.getElementById("icon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(() => {
            document.getElementById("error").innerText = "Something went wrong!";
        });
}

document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

window.onload = () => {
    getLocation();
};