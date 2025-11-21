
// Fonction pour récupérer la météo depuis L'Api
function getWeather(ville) {
    const apiKey = "b427e47dd6044708852173249252703";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ville}&lang=fr`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Erreur lors de l'appel de l'API :", error));
}

//Fonction qui affiche les données 
function displayWeather(data) {
    document.querySelector(".city").innerText = "Météo à " + data.location.name;
    document.querySelector(".temp").innerText = data.current.temp_c + "°C";
    document.querySelector(".humidity").innerText = "Humidité : " + data.current.humidity + "%";
    document.querySelector(".wind").innerText = "Vent : " + data.current.wind_kph + " km/h";
    const iconUrl = "https:" + data.current.condition.icon;
    document.querySelector(".weather-icon").src = iconUrl;
    document.querySelector(".description").innerText = data.current.condition.text;
    document.getElementById("update-time").textContent = "Dernière mise à jour : " + new Date().toLocaleTimeString();

}



// Lecture du fichier conf.json pour connaître la ville à afficher.
fetch("conf.json")
    .then(response => response.json())
    .then(config => {
        const ville = config.ville;
        getWeather(ville);

        // Rafraîchissement auto au bout de 1 heure
        setInterval(() => {
            console.log("Actualisation automatique :", new Date().toLocaleTimeString());
            getWeather(ville);
        }, 3600000); // 1 heure = 3600000 millisecondes
    })
    .catch(error => console.error("Erreur lors du chargement de la configuration :", error));