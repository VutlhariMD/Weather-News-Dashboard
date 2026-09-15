import { WEATHER_API, NEWS_API } from "../api.js";
import https from "https";

function promiseFetchWeather(): Promise<any> {
    console.log("Fetching the weather data...");

    return new Promise((resolve, reject) => {
        https
            .get(WEATHER_API, (response) => {
                let weatherData = "";

                response.on("data", (chunk) => {
                    weatherData += chunk;
                });

                response.on("end", () => {
                    try {
                        const parsedData = JSON.parse(weatherData);
                        resolve(parsedData);
                    } catch (err) {
                        reject(err);
                    }
                });
            })
            .on("error", reject);
    });
}

function promiseFetchNews(): Promise<any> {
    console.log("Fetching the news data...");

    return new Promise((resolve, reject) => {
        https
            .get(NEWS_API, (response) => {
                let newsData = "";

                response.on("data", (chunk) => {
                    newsData += chunk;
                });

                response.on("end", () => {
                    try {
                        const parsedData = JSON.parse(newsData);
                        resolve(parsedData);
                    } catch (err) {
                        reject(err);
                    }
                });
            })
            .on("error", reject);
    });
}

promiseFetchWeather()
    .then((weatherData) => {
        console.log("Weather data received:");
        console.log(weatherData);
    })
    .catch((error) => {
        console.error("Failed to fetch weather:", error);
    });

promiseFetchNews()
    .then((newsData) => {
        console.log("News data received:");
        console.log(newsData);
    })
    .catch((error) => {
        console.error("Failed to fetch news:", error);
    });

Promise.all([promiseFetchWeather(), promiseFetchNews()])
    .then(([weatherData, newsData]) => {
        console.log("Both requests completed!");

        console.log("Weather:");
        console.log(weatherData);

        console.log("News:");
        console.log(newsData);
    })
    .catch((error) => {
        console.error("Something went wrong:", error);
    });

Promise.race([promiseFetchNews(), promiseFetchWeather()])
    .then((result) => {
        console.log("The fastest request finished: ");
        console.log(result);
    })
    .catch((error) => {
        console.error("Request failed :", error);
    });
