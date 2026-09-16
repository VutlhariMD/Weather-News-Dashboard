import { WEATHER_API, NEWS_API } from "../api.js";

async function fetchWeatherData(): Promise<void> {
    try {
        console.log("Starting async process");

        const weatherResponse = await fetch(WEATHER_API);
        const weatherData = await weatherResponse.json();

        const newsResponse = await fetch(NEWS_API);
        const newsData = await newsResponse.json();

        console.log("Completed the tasks successfully");

        console.log("Weather:", weatherData);
        console.log("News:", newsData);

    } catch (error) {
        console.log("An error occurred in this process:", error);
    }
}

fetchWeatherData();